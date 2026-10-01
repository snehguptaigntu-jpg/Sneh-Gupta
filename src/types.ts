export type Language = 'en' | 'hi' | 'gu';

export type ComplaintStatus = 'reported' | 'verified' | 'assigned' | 'in_progress' | 'resolved' | 'hotspot';

export type WasteCategory = 
  | 'Plastic'
  | 'Organic'
  | 'Mixed'
  | 'Construction'
  | 'Biomedical'
  | 'E-Waste'
  | 'Overflowing Bin';

export interface TimelineEvent {
  title: string;
  time: string;
  desc: string;
  done: boolean;
  officer?: string;
}

export interface Complaint {
  id: string;
  type: WasteCategory;
  title: string;
  description: string;
  status: ComplaintStatus;
  lat: number;
  lng: number;
  ward: string;
  wardName: string;
  landmark: string;
  date: string;
  time: string;
  photoUrl: string;
  resolutionPhotoUrl?: string;
  reportedBy: string;
  isAnonymous?: boolean;
  upvotes: number;
  assignedVehicleId?: string;
  assignedOfficer?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedKg?: number;
  timeline: TimelineEvent[];
}

export interface SanitationVehicle {
  id: string;
  plate: string;
  ward: string;
  wardName: string;
  driverName: string;
  driverPhone: string;
  speed: string;
  lat: number;
  lng: number;
  status: 'Live' | 'En Route' | 'At Depot' | 'Discharging';
  eta: string;
  fuelBattery: number;
  capacityFilled: number;
  type: 'Compactor Truck' | 'Electric Tipper' | 'Hydraulic Dumper' | 'Sweeper';
  routeProgress: number; // percentage
  currentStop: string;
  totalStops: number;
}

export interface HotspotArea {
  id: string;
  name: string;
  ward: string;
  lat: number;
  lng: number;
  radius: number;
  complaintCount: number;
  severity: 'critical' | 'high' | 'moderate';
  primaryWaste: string;
  lastSanitized: string;
}

export interface SmartBin {
  id: string;
  location: string;
  ward: string;
  lat: number;
  lng: number;
  fillLevel: number; // 0 - 100
  type: 'Dry Waste' | 'Wet Waste' | 'Recyclable';
  batteryStatus: number;
}

export interface CitizenNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'status_update' | 'vehicle_nearby' | 'hotspot_alert' | 'community';
  actionId?: string;
}

export interface WardLeaderboard {
  ward: string;
  name: string;
  score: number;
  resolvedRate: number;
  avgResolutionHours: number;
  rank: number;
  totalComplaints: number;
  activeHotspots: number;
}
