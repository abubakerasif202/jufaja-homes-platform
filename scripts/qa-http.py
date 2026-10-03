"""Check the actual production server without sending enquiries. Run after npm run build."""
import concurrent.futures
import json
import subprocess
import urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = 'http://127.0.0.1:3011'
class Inspect(HTMLParser):
    def __init__(self):
        super().__init__()
        self.mains = 0
        self.h1 = 0
        self.canonical = ''
        self.robots = ''
        self.in_title = False
        self.title = ''
        self.options = []
        self.in_selected = False
    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'main': self.mains += 1
        if tag == 'h1': self.h1 += 1
        if tag == 'title': self.in_title = True
        if tag == 'link' and values.get('rel') == 'canonical': self.canonical = values.get('href')
        if tag == 'meta' and values.get('name') == 'robots': self.robots = values.get('content')
        if tag == 'option' and 'selected' in values: self.in_selected = True
    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'option': self.in_selected = False
    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_selected: self.options.append(data)

def read(route):
    with urllib.request.urlopen(BASE + route, timeout=20) as response:
        assert response.status == 200, route
        html = response.read().decode()
        result = Inspect()
        result.feed(html)
        return html, result

def check(route):
    html, result = read(route)
    assert result.mains == 1, (route, result.mains)
    assert result.h1 == 1, (route, result.h1)
    assert result.canonical == ('https://jufaja-homes-platform.vercel.app' + route).rstrip('/'), (route, result.canonical)
    assert 'casaview.com.au' not in html, route
    assert 'priceGuideFrom' not in html, route
    if route.startswith('/designs/'):
        assert 'noindex' in result.robots, (route, result.robots)
    assert 'JUFAJA Constructions | JUFAJA Constructions' not in result.title, (route, result.title)

server = subprocess.Popen(['node', 'node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3011'], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
try:
    for line in server.stdout:
        if 'Ready in' in line: break
        if server.poll() is not None: raise RuntimeError('Production server did not start: ' + line)
    routes = ['/', '/designs', '/packages', '/display-homes', '/projects', '/about-us', '/contact', '/custom-homes', '/knockdown-rebuild', '/inclusions', '/privacy']
    routes += ['/designs/' + design['slug'] for design in json.loads((ROOT / 'src/data/designs.json').read_text())]
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(check, routes))
    print('Production routes verified:', len(routes))
    for query, expected in [('interest=House%20%26%20Land', 'House and land'), ('interest=Display%20Homes', 'Display home'), ('design=Blaxland%20Series', 'Home design'), ('project=Courtyard%20Residence', 'Design inspiration')]:
        html, result = read('/contact?' + query)
        assert expected in result.options, (query, result.options)
        if query.startswith('design='):
            assert 'Enquiring about:' in html and 'I would like to discuss Blaxland Series.' in html
        print('Enquiry context verified:', query)
    html, _ = read('/sitemap.xml')
    assert '/privacy' in html and '/designs/blaxland' not in html
    print('Sitemap verified; unverified designs remain excluded.')
finally:
    server.terminate()
    server.wait(timeout=10)
