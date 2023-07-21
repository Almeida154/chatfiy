import { Ref } from 'vue';

export const onChangeText = (e: Event, ref: Ref) => {
  const value = (e.target as HTMLInputElement).value;
  ref.value = value;
};
