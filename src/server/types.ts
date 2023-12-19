export type Event = {
  id: number;
  isOver: boolean;
  sensors?: Sensor[];
  created_at: Date;
};

export type Sensor = {
  id: number;
  intensity: number;
  latitude: number;
  longitude: number;
  events?: Event[];
  created_at: Date;
};

export type Base = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  created_at: Date;
};
