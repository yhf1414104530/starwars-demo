import {SearchMoviesParamsType} from "../model/req";
import {MockItemListType} from "../model/res/mock-item-list-type";

export function searchMoviesApi(params: SearchMoviesParamsType): Promise<MockItemListType[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const filteredData = sourcesData.filter(item =>
                item.title?.includes(params.keywords) ||
                item.author?.includes(params.keywords)
            );
            resolve(filteredData);
        }, 500);
    });
}

const sourcesData: MockItemListType[] = [
    {
        title: 'movie-one',
        createTime: '2021-12-06T00:50:22.611Z',
        author: 'yhf-one',
        cover: 'http://file.kkx88.cn/images/episodeI.jpg',
    },
    {
        title: 'movie-two',
        author: 'yhf-two',
        createTime: '2022-08-08T00:50:22.611Z',
        cover: 'http://file.kkx88.cn/images/episodeII.jpg',
    },
    {
        title: 'movie-three',
        author: 'yhf-three',
        createTime: '2010-12-06T00:50:22.611Z',
        cover: 'http://file.kkx88.cn/images/episodeIII.jpg',
    },
    {
        title: 'movie-four',
        author: 'yhf-four',
        createTime: '2011-12-06T00:50:22.611Z',
        cover: 'http://file.kkx88.cn/images/episodeIV.jpg',
    },
    {
        title: 'movie-five',
        author: 'yhf-five',
        createTime: '2012-12-06T00:50:22.611Z',
        cover: 'http://file.kkx88.cn/images/episodeV.jpg',
    },
    {
        title: 'movie-six',
        author: 'yhf-six',
        createTime: '2013-12-06T00:50:22.611Z',
        cover: 'http://file.kkx88.cn/images/episodeVI.jpg',
    },
    {
        title: 'movie-seven',
        author: 'yhf-seven',
        createTime: '2014-12-06T00:50:22.611Z',
        cover: 'http://file.kkx88.cn/images/episodeVII.jpg',
    },
]
