import React from "react";
import {Layout} from "../components";
import {useQuery, gql} from '@apollo/client'
import TrackCard from "../containers/track-card";
import {Track} from "../__generated__/graphql";
import {QueryResult} from "../components";

const TRACKS = gql`query Query {
    tracksForHome {
        id
        title
        author {
            id
            name
            photo
        }
        thumbnail
        length
        modulesCount

    }
}`;
/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
    const {loading, error, data} = useQuery(TRACKS);
    if (loading) return 'Loading...';
    if (error) return `ERROR! ${error.message}`

    return <Layout grid>
        <QueryResult error={error} loading={loading} data={data}>
            {
                data?.tracksForHome?.map((track: Track) => <TrackCard key={track.id} track={track}/>)
            }
        </QueryResult>
    </Layout>
};

export default Tracks;
