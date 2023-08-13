import Auth from '../utils/auth';

export const searchBirdAPI = (query) => {
    return fetch(`https://nuthatch.lastelm.software/v2/birds?region=North%20America&hasImg=True&name=${query}`,
    headers: {'api-key': process.env.KEY});
}
