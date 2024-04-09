import {useRequest} from "ahooks";
import {searchMoviesApi} from "../request/mock-api";
import {useState} from "react";
import {MockItemListType} from "../model/res/mock-item-list-type";

export function useSearchContext() {

    const [searchResult, setSearchResult] = useState<MockItemListType[]>()

    const searchMoviesCtx = useRequest(searchMoviesApi, {
        manual: true
    });

    async function search(keywords: string) {
        clean()
        let res = await searchMoviesCtx.runAsync({keywords});
        setSearchResult(res)
    }

    function clean() {
        setSearchResult([])
    }

    return {
        search,
        clean,
        searchMoviesCtx,
        searchResult
    }
}