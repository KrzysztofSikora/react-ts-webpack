import React from 'react'

import { Store } from "../stores/Store";
import { toggleFavAction } from "../actions/Actions";
import { IEpisodeProps } from "../interfaces/interfaces";

const EpisodesList = React.lazy<any>(() => import('../components/EpisodesList'))

export default function FavPage(): JSX.Element {
    const { state, dispatch } = React.useContext(Store);

    const props: IEpisodeProps = {
        episodes: state.favourites,
        store: { state, dispatch },
        toggleFavAction,
        favourites: state.favourites
    }

    return (
        <React.Suspense fallback={<div>loading... </div>}>
            <div className="episode-layout">
                <EpisodesList { ...props } />
            </div>
        </React.Suspense>
    )
}
