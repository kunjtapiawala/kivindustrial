export type Manufacturer = {
  name: string;
  focus: string[];
  summary: string;
  blindShip: boolean;
  popular: boolean;
};

export const manufacturers: Manufacturer[] = [
  {
    name: "Siemens",
    focus: ["Drives", "PLCs", "Safety", "Networking"],
    summary:
      "Factory automation, motion, and power distribution with global availability and blind-ship support to end users.",
    blindShip: true,
    popular: true,
  },
  {
    name: "SICK",
    focus: ["Sensors", "Safety", "Vision"],
    summary:
      "Advanced sensing, safety scanners, and vision technology for packaging, logistics, and heavy industry.",
    blindShip: true,
    popular: true,
  },
  {
    name: "Honeywell",
    focus: ["Process Control", "Safety", "HVAC"],
    summary:
      "Process instrumentation, plant safety, and building automation hardware with 24/7 sourcing coverage.",
    blindShip: true,
    popular: true,
  },
  {
    name: "Banner Engineering",
    focus: ["Sensors", "Lighting", "Wireless"],
    summary:
      "Industrial sensing, LED lighting, and wireless monitoring solutions for automation upgrades.",
    blindShip: true,
    popular: true,
  },
  {
    name: "Mitsubishi Electric",
    focus: ["Robotics", "Drives", "PLCs"],
    summary:
      "Robots, motion, and control systems with blind shipment options and application engineering support.",
    blindShip: true,
    popular: true,
  },
  {
    name: "Omron",
    focus: ["Controls", "Sensors", "Safety"],
    summary:
      "Controls, sensing, and safety products including PLCs, IO, and robotics with quick-turn fulfillment.",
    blindShip: true,
    popular: true,
  },
  {
    name: "ABB",
    focus: ["Drives", "Robotics", "Power"],
    summary:
      "Motion, robotics, and electrification hardware supported with blind shipping to integrators and OEMs.",
    blindShip: true,
    popular: true,
  },
  {
    name: "GE Industrial",
    focus: ["Power", "Controls", "Motors"],
    summary:
      "Industrial power distribution, controls, and motor solutions with replacement sourcing for legacy platforms.",
    blindShip: true,
    popular: true,
  },
  {
    name: "FANUC",
    focus: ["Robotics", "Servo", "Controls"],
    summary:
      "Robots and CNC/servo products with rapid parts sourcing and blind shipment to production floors.",
    blindShip: true,
    popular: true,
  },
  {
    name: "Schneider Electric",
    focus: ["Power", "Controls", "Safety"],
    summary:
      "Power distribution, automation, and safety hardware including Modicon PLCs and Square D protection.",
    blindShip: true,
    popular: true,
  },
  {
    name: "Parker Hannifin",
    focus: ["Hydraulics", "Pneumatics", "Filtration"],
    summary:
      "Motion and control solutions from hydraulics to pneumatics with custom assemblies and blind ship options.",
    blindShip: true,
    popular: true,
  },
  {
    name: "Bosch Rexroth",
    focus: ["Hydraulics", "Drives", "Linear Motion"],
    summary:
      "Power units, drives, and linear motion components with engineered system support and blind shipments.",
    blindShip: true,
    popular: true,
  },
  // Additional manufacturers can be added below as needed.
  {
    name: "Rockwell Automation",
    focus: ["PLCs", "Drives", "Safety"],
    summary:
      "Allen-Bradley control platforms, drives, and safety gear with emergency sourcing support.",
    blindShip: true,
    popular: false,
  },
  {
    name: "SMC",
    focus: ["Pneumatics", "Vacuum", "Process"],
    summary:
      "Pneumatic valves, actuators, and air prep equipment with kit assembly and blind shipping.",
    blindShip: true,
    popular: false,
  },
  {
    name: "Festo",
    focus: ["Pneumatics", "Motion", "Electrical Automation"],
    summary:
      "Automation components from electromechanical actuators to pneumatic manifolds.",
    blindShip: true,
    popular: false,
  },
  {
    name: "Turck",
    focus: ["Sensors", "Connectivity", "Fieldbus"],
    summary:
      "Industrial sensing, connectivity, and IO systems for harsh environments.",
    blindShip: true,
    popular: false,
  },
  {
    name: "Belden",
    focus: ["Networking", "Connectivity", "Cable"],
    summary:
      "Industrial networking hardware and cable with cut-to-length options.",
    blindShip: true,
    popular: false,
  },
  {
    name: "Phoenix Contact",
    focus: ["Controls", "Connectivity", "Power"],
    summary:
      "Terminal blocks, power supplies, controls, and networking with rapid specification support.",
    blindShip: true,
    popular: false,
  },
  {
    name: "WAGO",
    focus: ["IO", "Connectivity", "Power"],
    summary:
      "Spring clamp connectivity, IO systems, and power supplies for control panels.",
    blindShip: true,
    popular: false,
  },
  {
    name: "Doosan Industrial",
    focus: ["Heavy Equipment", "Power", "Controls"],
    summary:
      "Powertrain components, controllers, and heavy equipment spares for mining and construction fleets.",
    blindShip: true,
    popular: false,
  },
  {
    name: "Liebherr",
    focus: ["Heavy Machinery", "Automation", "Hydraulics"],
    summary:
      "Controllers, hydraulic assemblies, and automation upgrades for Liebherr cranes, mining trucks, and mixers.",
    blindShip: true,
    popular: false,
  },
];
