export interface Person {
  id: number;
  name: string;
}

export interface PersonCreateData extends Omit<Person, 'id'> {}
export interface PersonUpdateData extends Partial<Person> {}
