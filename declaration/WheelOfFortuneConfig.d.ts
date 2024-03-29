interface WheelOfFortuneConfig {
    stroke?: {
        color: string;
        width: number;
    };
    indicator?: {
        color?: string;
        style: 'none' | 'static';
        width?: number;
        height?: number;
    };
    pins?: {
        color: string;
        size: number;
        margin: number;
    };
    text?: {
        color: string;
        font: string;
        size: number;
    };
}
