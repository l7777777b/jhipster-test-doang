export interface IRankProperties {
  id?: number;
  rank?: number;
  minExp?: number;
  maxExp?: number;
  maxStamina?: number;
  maxAlly?: number;
  maxTeam?: number;
}

export const defaultValue: Readonly<IRankProperties> = {};
