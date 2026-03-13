export type BindState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

export const defaultBindState: BindState = {
  loading: false,
  success: false,
  error: null,
};

