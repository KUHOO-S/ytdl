import fs from 'fs';

import logger from './logger';
import VideoInfo from '../models/VideoInfo';

export default async function dumpJson(videoInfo: VideoInfo, jsonDump: string): Promise<void> {
    return new Promise((resolve) => {
        fs.writeFile(jsonDump, JSON.stringify(videoInfo), (err: Error) => {
            if (err) logger.error(err);
            resolve();
        });
    });
}

export async function dumpToFile(data: string, filename: string): Promise<void> {
    return new Promise((resolve) => {
        fs.writeFile(filename, data, (err: Error) => {
            if (err) logger.error(err);
            resolve();
        });
    });
}
