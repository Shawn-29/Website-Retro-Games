import { Spinner } from '../components';
import { ImageStripe } from '../components/ImageStripe';
import { SinglePlatform } from '../components/SinglePlatform';
import { useFetch } from '../custom_hooks/useFetch';
import { API_ENDPOINT, CDN_ENDPOINT } from '../utils/constants';

export const PlatformsPage = () => {

    const {
        isLoading,
        data,
        error
    } = useFetch(`${API_ENDPOINT}/platforms`);

    if (isLoading) {
        return <main>
            <Spinner />
        </main>;
    }

    if (error) {
        return <main>
            <header className='error-header'>
                <h4>There are no platforms at this time.</h4>
                <h4 className='text-center'>Please check back later.</h4>
            </header>
        </main>;
    }

    return <main>
        {isLoading ? <Spinner /> :
            <>
                <ImageStripe
                    imgData={
                        error ? [] :
                            data.platforms.map(d => ({
                                id: d.id,
                                url: `${CDN_ENDPOINT}${d.img_url}`,
                                altText: d.name
                            }))
                    }
                >
                    <SinglePlatform />
                </ImageStripe>
            </>}
    </main>;
};