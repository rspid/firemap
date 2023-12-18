export type Event = {
  id: number;
  isOver: boolean;
  sensors?: Sensor[];
  createdAt: Date;
};

export type Sensor = {
  id: number;
  intensite: number;
  latitude: number;
  longitude: number;
  events?: Event[];
  createdAt: Date;
};
