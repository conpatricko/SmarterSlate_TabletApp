// types/SlateData.ts
export interface SlateData {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    
    // Camera/Roll data
    rollValues: number[];
    numCams: number;
    
    // Scene data
    sceneNumber: number;
    sceneLetter?: string;
    takeNumber: number;
    
    // Production info
    producer: string;
    production: string;
    productionCompany: string;
    director: string;
    cinematographer: string;
    
    // Scene details
    intExt: 'INT' | 'EXT' | 'INT/EXT';
    dayNight: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK' | 'MAGIC HOUR';
    location: string;
    
    // Technical settings
    frameRate: number;
    soundSyncMode: 'SYNC' | 'MOS' | 'CAM ONLY';
    lensInfo: string;
    lutInfo: string;
    isLocked: boolean;
    
    // Markers/timestamps
    markers: Marker[];
  }
  
  export interface Marker {
    id: string;
    timestamp: Date;
    timecode: string;
    type: 'clap' | 'cut' | 'action' | 'custom';
    action?: string;
    metadata?: Partial<SlateData>;
  }