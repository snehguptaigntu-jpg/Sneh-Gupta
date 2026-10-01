import { Complaint, SanitationVehicle, HotspotArea, SmartBin, CitizenNotification, WardLeaderboard } from '../types';

export const WARDS_LIST = [
  { id: '01', name: 'Civil Lines & Heritage Zone', lat: 28, lng: 25 },
  { id: '02', name: 'Station Road & Commercial Hub', lat: 35, lng: 70 },
  { id: '03', name: 'Vasant Kunj & Green Park', lat: 48, lng: 42 },
  { id: '04', name: 'Subhash Nagar & Industrial Area', lat: 72, lng: 30 },
  { id: '05', name: 'Gandhi Marg & University Campus', lat: 68, lng: 72 },
  { id: '06', name: 'Nehru Colony & Riverfront', lat: 22, lng: 55 },
  { id: '07', name: 'Shivaji Ward & Vegetable Mandi', lat: 55, lng: 20 },
  { id: '08', name: 'Tagore Nagar & Outer Ring', lat: 80, lng: 60 },
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'SWT-2026-00482',
    type: 'Overflowing Bin',
    title: 'Commercial Market Secondary Bin Overflowing',
    description: 'Dumping container overflowing onto pedestrian sidewalk for 2 days. Street dogs spreading waste.',
    status: 'hotspot',
    lat: 44,
    lng: 38,
    ward: '03',
    wardName: 'Vasant Kunj & Green Park',
    landmark: 'Opposite Community Market Gate 2',
    date: '2026-10-01',
    time: '08:30 AM',
    photoUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80',
    reportedBy: 'Aarav Sharma',
    isAnonymous: false,
    upvotes: 19,
    assignedVehicleId: 'SW-07',
    assignedOfficer: 'Er. Rakesh Verma (SI-03)',
    priority: 'urgent',
    estimatedKg: 350,
    timeline: [
      { title: 'Grievance Registered', time: '08:30 AM', desc: 'Complaint logged with geotag & photo evidence', done: true },
      { title: 'Ward Officer Verified', time: '09:05 AM', desc: 'Sanitary Inspector inspected site. Severity escalated.', done: true, officer: 'Er. Rakesh Verma' },
      { title: 'Fleet Dispatched', time: '09:30 AM', desc: 'Compactor Truck SW-07 assigned to route', done: true },
      { title: 'Collection in Progress', time: '10:15 AM', desc: 'Sanitation squad clearing peripheral waste', done: false },
      { title: 'Site Disinfected & Closed', time: 'Est. 11:30 AM', desc: 'Bleaching powder spray & geotagged closing photo', done: false }
    ]
  },
  {
    id: 'SWT-2026-00485',
    type: 'Plastic',
    title: 'Single-Use Plastic Dumping near Water Drainage',
    description: 'Bags of polyethylene wrappers and PET bottles clogging storm water canal.',
    status: 'assigned',
    lat: 58,
    lng: 24,
    ward: '07',
    wardName: 'Shivaji Ward & Vegetable Mandi',
    landmark: 'Behind Fruit Wholesalers Shade',
    date: '2026-10-01',
    time: '07:45 AM',
    photoUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80',
    reportedBy: 'Pooja Patel',
    isAnonymous: false,
    upvotes: 11,
    assignedVehicleId: 'SW-12',
    assignedOfficer: 'Smt. Anjali Trivedi (SI-07)',
    priority: 'high',
    estimatedKg: 180,
    timeline: [
      { title: 'Grievance Registered', time: '07:45 AM', desc: 'Filed via Citizen Mobile Portal', done: true },
      { title: 'Officer Verified', time: '08:20 AM', desc: 'Classified under Plastic Waste Action Plan', done: true, officer: 'Smt. Anjali Trivedi' },
      { title: 'Fleet Dispatched', time: '09:10 AM', desc: 'Mini Tipper SW-12 scheduled on sector loop', done: true },
      { title: 'Waste Lifted & Weighed', time: 'Est. 10:45 AM', desc: 'Will be directed to Material Recovery Facility (MRF)', done: false },
      { title: 'Resolution Acknowledged', time: 'Est. 11:15 AM', desc: 'Closing notice to reporter', done: false }
    ]
  },
  {
    id: 'SWT-2026-00479',
    type: 'Construction',
    title: 'Illegal C&D Debris Dump on Empty Plot',
    description: 'Broken concrete slabs, bricks and plaster left overnight by private tractor.',
    status: 'verified',
    lat: 66,
    lng: 68,
    ward: '05',
    wardName: 'Gandhi Marg & University Campus',
    landmark: 'Corner plot adjacent to Hostel No. 4',
    date: '2026-09-30',
    time: '06:15 PM',
    photoUrl: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&auto=format&fit=crop&q=80',
    reportedBy: 'Kishore Joshi',
    isAnonymous: true,
    upvotes: 8,
    assignedOfficer: 'Shri Vikram Singh (SI-05)',
    priority: 'medium',
    estimatedKg: 900,
    timeline: [
      { title: 'Grievance Registered', time: 'Sep 30, 06:15 PM', desc: 'Logged anonymously with geo-coordinates', done: true },
      { title: 'Inspection Complete', time: 'Oct 01, 08:00 AM', desc: 'Hydraulic loader requisition requested', done: true, officer: 'Shri Vikram Singh' },
      { title: 'Heavy Loader Requisition', time: 'Pending Scheduling', desc: 'Awaiting C&D Recycling Plant Carrier', done: false },
      { title: 'Site Clearance', time: 'Est. Oct 02, 10:00 AM', desc: 'Scheduled clearance', done: false }
    ]
  },
  {
    id: 'SWT-2026-00468',
    type: 'Organic',
    title: 'Market Vegetable Waste Rotting near School Lane',
    description: 'Rotting vegetable remains causing severe odor and breeding flies near primary school.',
    status: 'resolved',
    lat: 32,
    lng: 68,
    ward: '02',
    wardName: 'Station Road & Commercial Hub',
    landmark: 'Lane 4, Subzi Mandi North Gate',
    date: '2026-09-30',
    time: '09:00 AM',
    photoUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    resolutionPhotoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    reportedBy: 'Dinesh Solanki',
    isAnonymous: false,
    upvotes: 24,
    assignedVehicleId: 'SW-03',
    assignedOfficer: 'Er. Mahendra Parmar',
    priority: 'high',
    estimatedKg: 420,
    timeline: [
      { title: 'Grievance Registered', time: 'Sep 30, 09:00 AM', desc: 'Report submitted by 3 local residents', done: true },
      { title: 'Verified by Inspector', time: 'Sep 30, 09:30 AM', desc: 'Assigned as high biological hazard', done: true },
      { title: 'Electric Tipper SW-03 Dispatched', time: 'Sep 30, 10:10 AM', desc: 'Crew arrived with lime powder', done: true },
      { title: 'Collected to Biogas Center', time: 'Sep 30, 11:35 AM', desc: 'Waste lifted & sent for biomethanation', done: true },
      { title: 'Resolved & Disinfected', time: 'Sep 30, 12:10 PM', desc: 'Area cleaned and verified by Sanitary Inspector', done: true }
    ]
  },
  {
    id: 'SWT-2026-00492',
    type: 'Biomedical',
    title: 'Discarded Syringes & Medical Waste on Roadside',
    description: 'Open red bio-hazard bags spilled over gutter near local private clinic alley.',
    status: 'reported',
    lat: 26,
    lng: 28,
    ward: '01',
    wardName: 'Civil Lines & Heritage Zone',
    landmark: 'Gali 2, Behind City Diagnostic Lab',
    date: '2026-10-01',
    time: '09:12 AM',
    photoUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&auto=format&fit=crop&q=80',
    reportedBy: 'Dr. Neha Kapoor',
    isAnonymous: false,
    upvotes: 31,
    priority: 'urgent',
    estimatedKg: 45,
    timeline: [
      { title: 'Grievance Registered', time: '09:12 AM', desc: 'Direct SOS alert triggered for Hazardous/Biomedical', done: true },
      { title: 'Bio-Safety Team Alerted', time: '09:20 AM', desc: 'Dedicated incinerator vehicle alerted', done: false }
    ]
  }
];

export const MOCK_VEHICLES: SanitationVehicle[] = [
  {
    id: 'SW-07',
    plate: 'DL-1C-WA-9042',
    ward: '03',
    wardName: 'Vasant Kunj & Green Park',
    driverName: 'Rameshwar Yadav',
    driverPhone: '+91 98230 44102',
    speed: '28 km/h',
    lat: 41,
    lng: 39,
    status: 'Live',
    eta: '6 min',
    fuelBattery: 82,
    capacityFilled: 68,
    type: 'Compactor Truck',
    routeProgress: 64,
    currentStop: 'Block C Community Bins',
    totalStops: 24
  },
  {
    id: 'SW-12',
    plate: 'DL-1C-EV-3318',
    ward: '07',
    wardName: 'Shivaji Ward & Vegetable Mandi',
    driverName: 'Bhanu Pratap',
    driverPhone: '+91 98112 55901',
    speed: '22 km/h',
    lat: 59,
    lng: 23,
    status: 'Live',
    eta: '12 min',
    fuelBattery: 91,
    capacityFilled: 44,
    type: 'Electric Tipper',
    routeProgress: 42,
    currentStop: 'Mandi Gate No. 3',
    totalStops: 18
  },
  {
    id: 'SW-03',
    plate: 'DL-1C-CT-1092',
    ward: '02',
    wardName: 'Station Road & Commercial Hub',
    driverName: 'Jagdish Kumar',
    driverPhone: '+91 97234 88390',
    speed: '16 km/h',
    lat: 34,
    lng: 66,
    status: 'Live',
    eta: '18 min',
    fuelBattery: 74,
    capacityFilled: 88,
    type: 'Hydraulic Dumper',
    routeProgress: 85,
    currentStop: 'Railway Goods Shed Corner',
    totalStops: 30
  },
  {
    id: 'SW-19',
    plate: 'DL-1C-SW-7740',
    ward: '05',
    wardName: 'Gandhi Marg & University Campus',
    driverName: 'Sanjay Meena',
    driverPhone: '+91 94140 19283',
    speed: '12 km/h',
    lat: 67,
    lng: 70,
    status: 'En Route',
    eta: '25 min',
    fuelBattery: 65,
    capacityFilled: 30,
    type: 'Sweeper',
    routeProgress: 30,
    currentStop: 'Science Faculty Avenue',
    totalStops: 15
  }
];

export const MOCK_HOTSPOTS: HotspotArea[] = [
  {
    id: 'HS-01',
    name: 'Ward 03 Main Commercial Market',
    ward: '03',
    lat: 44,
    lng: 38,
    radius: 40,
    complaintCount: 14,
    severity: 'critical',
    primaryWaste: 'Mixed Market & Packaging',
    lastSanitized: '24 hours ago'
  },
  {
    id: 'HS-02',
    name: 'Shivaji Vegetable Mandi Backyard',
    ward: '07',
    lat: 57,
    lng: 22,
    radius: 35,
    complaintCount: 9,
    severity: 'high',
    primaryWaste: 'Organic & Plastic Crates',
    lastSanitized: '12 hours ago'
  },
  {
    id: 'HS-03',
    name: 'Station Road Flyover Underpass',
    ward: '02',
    lat: 36,
    lng: 69,
    radius: 30,
    complaintCount: 7,
    severity: 'moderate',
    primaryWaste: 'Single-use plastic & wrappers',
    lastSanitized: '8 hours ago'
  }
];

export const MOCK_SMART_BINS: SmartBin[] = [
  { id: 'BIN-301', location: 'Central Market Fountain', ward: '03', lat: 46, lng: 44, fillLevel: 92, type: 'Dry Waste', batteryStatus: 94 },
  { id: 'BIN-302', location: 'Rose Garden Promenade', ward: '03', lat: 42, lng: 35, fillLevel: 45, type: 'Wet Waste', batteryStatus: 88 },
  { id: 'BIN-701', location: 'Vegetable Market Shed 2', ward: '07', lat: 55, lng: 23, fillLevel: 85, type: 'Wet Waste', batteryStatus: 92 },
  { id: 'BIN-201', location: 'Station Platform Entry West', ward: '02', lat: 33, lng: 67, fillLevel: 78, type: 'Recyclable', batteryStatus: 85 }
];

export const MOCK_NOTIFICATIONS: CitizenNotification[] = [
  {
    id: 'notif-1',
    title: 'Vehicle Approaching Your Sector',
    message: 'Compactor Truck SW-07 is just 450m away from Vasant Kunj Sector C. Segregated waste pickup commencing.',
    time: '4 mins ago',
    read: false,
    type: 'vehicle_nearby'
  },
  {
    id: 'notif-2',
    title: 'Grievance Resolved: SWT-2026-00468',
    message: 'Ward 02 Sanitary Inspector verified cleanup of organic waste at Subzi Mandi. View verified after-photo.',
    time: '2 hours ago',
    read: false,
    type: 'status_update',
    actionId: 'SWT-2026-00468'
  },
  {
    id: 'notif-3',
    title: 'High Alert: Chronic Hotspot Identified',
    message: '14 complaints recorded at Ward 03 Commercial Market. Additional 2 hydraulic sweepers assigned.',
    time: 'Yesterday',
    read: true,
    type: 'hotspot_alert'
  }
];

export const MOCK_LEADERBOARD: WardLeaderboard[] = [
  { ward: '03', name: 'Vasant Kunj & Green Park', score: 96.4, resolvedRate: 98.2, avgResolutionHours: 3.2, rank: 1, totalComplaints: 148, activeHotspots: 1 },
  { ward: '01', name: 'Civil Lines & Heritage Zone', score: 94.1, resolvedRate: 95.8, avgResolutionHours: 3.8, rank: 2, totalComplaints: 92, activeHotspots: 0 },
  { ward: '05', name: 'Gandhi Marg & University Campus', score: 89.6, resolvedRate: 91.0, avgResolutionHours: 5.1, rank: 3, totalComplaints: 114, activeHotspots: 1 },
  { ward: '02', name: 'Station Road & Commercial Hub', score: 85.2, resolvedRate: 88.4, avgResolutionHours: 6.0, rank: 4, totalComplaints: 210, activeHotspots: 2 },
  { ward: '07', name: 'Shivaji Ward & Vegetable Mandi', score: 81.5, resolvedRate: 84.0, avgResolutionHours: 7.4, rank: 5, totalComplaints: 185, activeHotspots: 2 }
];

export const SAMPLE_EVIDENCE_PHOTOS = [
  {
    name: 'Overflowing Municipal Bin',
    type: 'Overflowing Bin' as const,
    url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80',
    aiConfidence: '96%',
    hazard: 'Moderate (Street animals & odor)'
  },
  {
    name: 'Plastic & Polythene Bags Dump',
    type: 'Plastic' as const,
    url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop&q=80',
    aiConfidence: '94%',
    hazard: 'High (Drainage choking risk)'
  },
  {
    name: 'Vegetable / Wet Organic Waste',
    type: 'Organic' as const,
    url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&auto=format&fit=crop&q=80',
    aiConfidence: '91%',
    hazard: 'High (Bacterial breeding & stench)'
  },
  {
    name: 'Construction Debris / Malba',
    type: 'Construction' as const,
    url: 'https://images.unsplash.com/photo-1590496793929-36417d3117de?w=600&auto=format&fit=crop&q=80',
    aiConfidence: '95%',
    hazard: 'Moderate (Obstruction to road traffic)'
  }
];
