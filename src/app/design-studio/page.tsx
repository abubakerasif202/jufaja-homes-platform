import DesignStudio from '@/components/builder/DesignStudio';
import { pageMetadata } from '@/lib/site-metadata';
import './studio.css';

export const metadata = pageMetadata('Visualise Your Home in 3D', 'Explore a home or renovation concept with editable rooms, site boundaries, interactive 3D views and sourced NSW planning information. Save your brief for professional review.', '/design-studio');

export default function DesignStudioPage() {
  return <div className="studio-page"><header className="studio-intro"><p className="eyebrow">JUFAJA / Design studio</p><h1>Visualise your home.<br /><em>Start with your site.</em></h1><p>Shape a new home, renovation or extension in 3D. Look up your NSW site, explore room layouts and bring a clearer brief to your designer.</p><p className="studio-note">This working concept editor supports early design decisions. Surveyed plans, professional assessments and council or certifier signoff are required before construction.</p><noscript><p className="studio-alert">Enable JavaScript to edit a design and retrieve planning information. You can still <a href="/contact?interest=Custom%20Home">contact JUFAJA about your brief</a> or review the <a href="https://www.planningportal.nsw.gov.au/spatialviewer/">official NSW Spatial Viewer</a>.</p></noscript></header><DesignStudio /></div>;
}
