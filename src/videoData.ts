import axios from 'axios';
import { URLSearchParams } from 'url';

import VideoInfo from './models/VideoInfo';

export default class VideoData {
    readonly videoId: string;

    readonly videoInfo: VideoInfo;

    readonly videoTitle: string;

    readonly videoTime: string;

    readonly videoDescription: string;

    constructor(videoId: string, videoInfo: VideoInfo) {
        this.videoId = videoId;
        this.videoInfo = videoInfo;
        this.videoTitle = this.getVideoTitle();
        this.videoTime = this.getVideoTime();
        this.videoDescription = this.getVideoDescription();
    }

    static async fromLink(link: string): Promise<VideoData> {
        const videoId = VideoData.getVideoId(link);
        const videoInfo = await VideoData.getVideoInfo(videoId);

        VideoData.validateParsedResponse(videoInfo);

        return new VideoData(videoId, videoInfo);
    }

    private static getVideoId(url: string): string {
        const urlRegex = /^(["']|)((((https)|(http)):\/\/|)(www\.|)youtube\.com\/watch\?v=)[\w_-]*(["']|)$/;
        if (!urlRegex.test(url)) {
            throw new Error('Invalid URL.');
        }
        return url.split('watch?v=')[1];
    }

    private static validateParsedResponse(videoInfo: VideoInfo) {
        if (videoInfo.playabilityStatus.status === 'UNPLAYABLE') {
            return new Error('Video Unplayable');
        }
        if (!videoInfo.streamingData) {
            return new Error('Invalid videoInfo.streamingData');
        }
        return true;
    }

    private getVideoTitle(): string {
        return this.videoInfo.videoDetails.title;
    }

    private getVideoTime(): string {
        let lengthSeconds = Number(this.videoInfo.videoDetails.lengthSeconds);

        const minute = 60;
        const hour = 60 * minute;

        const hours = Math.floor(lengthSeconds / hour);
        lengthSeconds -= hour * hours;
        const minutes = Math.floor(lengthSeconds / minute);
        lengthSeconds -= minute * minutes;
        const seconds = lengthSeconds;

        function lpad(target: string, padString: string, length: Number) {
            let str = target;
            while (str.length < length) str = padString + str;
            return str;
        }

        let date = lpad(hours.toString(), '0', 2);
        date += `:${lpad(minutes.toString(), '0', 2)}`;
        date += `:${lpad(seconds.toString(), '0', 2)}`;

        return date;
    }

    private getVideoDescription(): string {
        return this.videoInfo.videoDetails.shortDescription;
    }

    public static async getVideoInfo(videoId: string): Promise<VideoInfo> {
        const videoIdRegex = /^[\w_-]+$/;
        if (!videoIdRegex.test(videoId)) {
            throw new Error('Invalid videoId.');
        }

        const eurl = `https://youtube.googleapis.com/v/${videoId}`;

        const response = await axios.get(`https://www.youtube.com/get_video_info?video_id=${videoId}&el=embedded&eurl=${eurl}&sts=18333`);
        const parsedResponse = Object.fromEntries(new URLSearchParams(response.data));

        const jsonResponse = JSON.parse(parsedResponse.player_response);
        const { playabilityStatus, videoDetails, streamingData } = jsonResponse;
        const videoInfo = <VideoInfo> { playabilityStatus, videoDetails, streamingData };

        return videoInfo;
    }
}
