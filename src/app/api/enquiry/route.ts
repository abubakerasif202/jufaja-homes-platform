import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      name, 
      fullName, 
      phone, 
      email, 
      enquiryType, 
      interestType, 
      suburb, 
      suburbOrCouncil, 
      landStatus, 
      ownLand, 
      targetDesignName,
      message, 
      website, 
      honeypot 
    } = body;

    // Honeypot spam check
    const trap = website || honeypot;
    if (trap && String(trap).trim() !== '') {
      return NextResponse.json({ success: true, message: 'Enquiry received' }, { status: 200 });
    }

    const resolvedName = (name || fullName || '').trim();
    const resolvedPhone = (phone || '').trim();
    const resolvedEmail = (email || '').trim().toLowerCase();

    // Basic validation
    if (!resolvedName || !resolvedEmail || !resolvedPhone) {
      return NextResponse.json(
        { success: false, error: 'Name, phone number, and email address are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resolvedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const leadRecord = {
      id: `LEAD-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      receivedAt: new Date().toISOString(),
      name: resolvedName,
      phone: resolvedPhone,
      email: resolvedEmail,
      enquiryType: enquiryType || interestType || 'General Enquiry',
      targetContext: targetDesignName || null,
      suburb: (suburb || suburbOrCouncil || 'Not specified').trim(),
      landStatus: landStatus || (ownLand ? 'Already owns land' : 'Not specified'),
      message: (message || '').trim(),
      status: 'new'
    };

    // Store in data/leads.json
    try {
      const dataDir = path.join(process.cwd(), 'src', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFilePath = path.join(dataDir, 'leads.json');
      let leads = [];
      if (fs.existsSync(leadsFilePath)) {
        try {
          const fileContent = fs.readFileSync(leadsFilePath, 'utf-8');
          leads = JSON.parse(fileContent);
        } catch (e) {
          leads = [];
        }
      }
      leads.push(leadRecord);
      fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2), 'utf-8');
    } catch (saveError) {
      console.error('Failed to append to leads.json:', saveError);
    }

    console.log('[JUFAJA Lead Captured]:', leadRecord);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your enquiry has been received. A JUFAJA building consultant will contact you shortly.',
        leadId: leadRecord.id
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your enquiry.' },
      { status: 500 }
    );
  }
}
