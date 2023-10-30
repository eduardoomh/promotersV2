// types/js-cookie.d.ts

declare module 'js-cookie' {
    export function get(name: string): string | undefined;
    export function set(name: string, value: string, options?: object): void;
    export function remove(name: string, options?: object): void;
  }
  