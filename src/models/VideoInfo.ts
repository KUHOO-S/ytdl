interface PlayabilityStatus {
    readonly status: string;
    readonly playableInEmbed: string;
    readonly contextParams: string;
}

interface VideoDetails {
    readonly title: string;
    readonly lengthSeconds: string;
    readonly shortDescription: string;
    readonly videoId: string;
}

interface Range {
    readonly start: string;
    readonly end: string;
}

export interface Format {
    readonly itag: Number;
    readonly url: string;
    readonly mimeType: string;
    readonly bitrate: Number;
    readonly width: Number;
    readonly height: Number;
    readonly lastModified: string;
    readonly contentLength: string;
    readonly quality: string;
    readonly qualityLabel?: string;
    readonly audioQuality?: string;
    readonly cipher?: string;
}

export interface AdaptiveFormat {
    readonly itag: Number;
    readonly url: string;
    readonly mimeType: string;
    readonly bitrate: Number;
    readonly width: Number;
    readonly height: Number;
    readonly initRange: Range;
    readonly indexRange: Range;
    readonly lastModified: string;
    readonly contentLength: string;
    readonly quality: string;
    readonly fps: Number;
    readonly qualityLabel?: string;
    readonly projectionType: string;
    readonly averageBitrate: Number;
    readonly audioQuality?: string;
    readonly approxDurationMs: string;
    readonly colorInfo?: object;
    readonly cipher?: string;
}

interface StreamingData {
    readonly expiresInSeconds: string;
    readonly formats: Array<Format>;
    readonly adaptiveFormats: Array<AdaptiveFormat>;
}

export default interface VideoInfo {
    readonly playabilityStatus: PlayabilityStatus;
    readonly videoDetails: VideoDetails;
    readonly streamingData: StreamingData;
    readonly tokens: Array<string>;
}
