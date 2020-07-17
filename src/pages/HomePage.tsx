import React from "react";

import { IEpisodeProps } from "../interfaces/interfaces";
import { Store } from "../stores/Store";
import { fetchDataAction, toggleFavAction } from "../actions/Actions";

const EpisodesList = React.lazy<any>(() => import('../components/EpisodesList'))

export default function HomePage() {
    const {state, dispatch} = React.useContext(Store);

    React.useEffect(() => {
        state.episodes.length === 0 && fetchDataAction(dispatch)
    })

    const props: IEpisodeProps = {
        episodes: state.episodes,
        store: { state, dispatch },
        toggleFavAction,
        favourites: state.favourites
    }
    return(
        <React.Fragment>
            <React.Suspense fallback={<div>loading... </div>}>
                <section className="episode-layout">
                    <EpisodesList {...props} />
                </section>
            </React.Suspense>
        </React.Fragment>
    )
}
