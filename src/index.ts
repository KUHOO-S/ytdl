import logger from './utils/logger';

import getDownloadLink from './getDownloadLink';
import VideoData from './videoData';
import {
    fetchAudioStream,
    fetchVideoStream,
    fetchVideo,
} from './videoDownloader';

export default async function runner() {
    // Added temporarily, 'npm start <youtubeLink>' or 'node src/index.js <youtubeLink> works
    const downloadLink = process.argv[2] || await getDownloadLink();
    const {
        videoId,
        videoTitle,
        videoTime,
        videoDescription,
        videoInfo,
    } = await VideoData.fromLink(downloadLink);

    logger.info(`Video ID: ${videoId}`);
    logger.info(`Video Title: ${videoTitle}`);
    logger.info(`Video Time: ${videoTime} seconds`);
    logger.info(`Video Description:\n ${videoDescription}`);

    fetchVideoStream(videoInfo, '720p', 'download3.json');
    fetchAudioStream(videoInfo, 'tiny');
    fetchVideo(videoInfo, '360p', 'download3.json');
}

runner();
