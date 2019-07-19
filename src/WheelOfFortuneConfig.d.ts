declare class WheelOfFortuneConfig {
    strokColor?: string;
    preRenderSize?: number|'auto';
    pins?: {
        color: string,
        size: number,
        margin: number
    };
    text?: {
        color: string;
        font: string;
        size: number;
    }
}
