// Last modified: 2025-08-10_1745pst
/**
 * Type definitions for SmarterSlate application
 */

// Timecode format: HH:MM:SS:FF
export interface Timecode {
    hours: number;
    minutes: number;
    seconds: number;
    frames: number;
    frameRate: number; // 23.976, 24, 25, 29.97, 30, etc.
  }
  
  // Main slate data structure
  export interface SlateData {
    // Production info
    production: string;
    director: string;
    cameraOperator: string;
    date: Date;
    
    // Scene/Take info
    sceneNumber: number;
    sceneLetter: string; // A, B, C, etc.
    takeNumber: number;
    
    // Camera/Sound info
    camera: string; // A, B, C, etc.
    roll: string;
    soundRoll: string;
    
    // Timecode data
    timecode: Timecode;
    frameRate: number;
    
    // Shot info
    shotDescription: string;
    lens: string;
    filters: string;
    
    // Status
    isRecording: boolean;
    isSynced: boolean;
    lastSyncTime?: Date;
  }
  
  // Marker types for logging
  export enum MarkerType {
    SLATE = 'SLATE',
    ACTION = 'ACTION',
    CUT = 'CUT',
    MARKER = 'MARKER',
    RESET = 'RESET',
    FALSE_TAKE = 'FALSE_TAKE',
  }
  
  // Log entry for each slate/action
  export interface SlateLogEntry {
    id: string;
    timestamp: Date;
    timecode: Timecode;
    markerType: MarkerType;
    slateData: SlateData;
    notes?: string;
    audioFile?: string; // Path to audio sync signal
    qrCodeData?: string; // Encoded QR data
  }
  
  // Peripheral device events
  export interface PeripheralEvent {
    type: 'KEYSTROKE' | 'ENCODER' | 'BUTTON' | 'SLATE_CLAP';
    key?: string;
    value?: number;
    direction?: 'CW' | 'CCW'; // Clockwise/Counter-clockwise for encoders
    timestamp: Date;
  }
  
  // QR Code data structure
  export interface QRCodeData {
    version: string; // Format version
    production: string;
    scene: string; // Combined scene number + letter
    take: number;
    camera: string;
    roll: string;
    timecode: string; // String format HH:MM:SS:FF
    frameRate: number;
    date: string; // ISO format
    checksum?: string; // Optional data integrity check
  }
  
  // Audio sync signal configuration
  export interface AudioSyncConfig {
    frequency: number; // Hz
    duration: number; // milliseconds
    pattern: 'SINGLE' | 'DOUBLE' | 'TRIPLE' | 'CUSTOM';
    customPattern?: number[]; // Array of durations for custom pattern
  }
  
  // Display settings for E-ink optimization
  export interface DisplaySettings {
    refreshMode: 'FULL' | 'PARTIAL' | 'FAST';
    contrast: number; // 0-100
    fontSize: 'SMALL' | 'MEDIUM' | 'LARGE' | 'XLARGE';
    theme: 'LIGHT' | 'DARK' | 'HIGH_CONTRAST';
    orientation: 'LANDSCAPE' | 'PORTRAIT';
  }
  
  // App settings
  export interface AppSettings {
    display: DisplaySettings;
    audioSync: AudioSyncConfig;
    qrCodeSize: number; // pixels
    autoIncrement: {
      take: boolean;
      scene: boolean;
      roll: boolean;
    };
    peripheralConfig: {
      enabled: boolean;
      deviceId?: string;
      keyMapping: Record<string, string>; // Map peripheral keys to actions
    };
    cloudSync: {
      enabled: boolean;
      endpoint?: string;
      apiKey?: string;
    };
  }
  
  // Database schema types
  export interface DatabaseSchema {
    productions: Production[];
    slateLogs: SlateLogEntry[];
    settings: AppSettings;
  }
  
  export interface Production {
    id: string;
    name: string;
    director: string;
    dop: string; // Director of Photography
    startDate: Date;
    endDate?: Date;
    frameRate: number;
    notes?: string;
    created: Date;
    modified: Date;
  }