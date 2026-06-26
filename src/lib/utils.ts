import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export type WithElementRef<T> = T & { ref?: unknown };

export type WithoutChildrenOrChild<T> = T extends { children?: any; child?: any }
	? Omit<T, 'children' | 'child'>
	: T;
