import Auth from '../utils/auth';

export const searchBirdAPI = (query) => {
    return fetch(`https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=25&hasImg=true&name=${query}`, {
        headers: {
            'api-key': '9bd89584-54fa-4e79-a1e5-ad3dbb988242'
        }
    })
}
