import React, {KeyboardEvent, useEffect, useRef, useState} from 'react';
import {useSearchContext} from "@/app/domain/hook/use-search-context";
import HighlightedTextComponent from "./highlighted-text";
import {useDebounceFn} from "ahooks";
import dayjs from "dayjs";
import Image from "next/image";


const SearchComponent: React.FC = () => {
    const containerRef = useRef<any>(null);
    const itemHeight = 105; // 假设每个项目的高度是50px
    // 初始化选中的搜索结果的索引
    const [selectedIndex, setSelectedIndex] = useState(-1);
    // 搜索关键字
    const [keywords, setKeywords] = useState<string>('');
    // 输入框焦点
    const [isFocused, setIsFocused] = useState<boolean>(false);

    let {search, clean, searchMoviesCtx, searchResult} = useSearchContext();
    // 搜索结果状态 loading 以及 error
    const {loading, error} = searchMoviesCtx

    const {run: runSearch} = useDebounceFn(() => {
        if (keywords)
            search(keywords).finally()
    }, {wait: 200},);

    useEffect(() => {
        // 使用节流函数来执行搜索
        runSearch()
        setSelectedIndex(-1)
        // 依赖项数组中包含keywords，以便在keywords变化时重新运行
    }, [keywords, runSearch]);

    useEffect(() => {
        const handleKeyDown = (event: any) => {
            const results = searchResult ?? []
            switch (event.key) {
                case 'ArrowUp':
                    // 如果用户按下了上箭头键，选中上一个搜索结果
                    if (selectedIndex > 0) {
                        setSelectedIndex(selectedIndex - 1);
                        console.log(containerRef.current.scrollHeight)
                        containerRef.current?.scrollTo(0, containerRef.current.scrollTop - itemHeight);
                    }
                    break;
                case 'ArrowDown':
                    // 如果用户按下了下箭头键，选中下一个搜索结果
                    if (selectedIndex < results.length - 1) {
                        if (selectedIndex > 0) {
                            containerRef.current?.scrollTo(0, containerRef.current.scrollTop + itemHeight);
                        }
                        setSelectedIndex(selectedIndex + 1);
                    }
                    break;
                case 'Enter':
                    // 如果用户按下了 Enter 键，导航到选中的搜索结果的页面
                    console.log('按下了' + selectedIndex)
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // 清理函数，在组件卸载时移除事件监听器
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [keywords, searchResult, selectedIndex]);


    function handleFocus() {
        setSelectedIndex(-1)
        setIsFocused(true)
    }

    function handleBlur() {
        setIsFocused(false)
    }

    function handleCleanKeyWords() {
        setKeywords('')
        clean()
    }

    function formatDateTime(timeStr: string) {
        const date = dayjs(timeStr);
        return date.format('MMMM D, YYYY')
    }


    const ClearIconCom = () => {
        return <div
            onMouseDown={(e) => {
                e.preventDefault(); // 阻止 mousedown 事件的默认行为
            }}
            onClick={() => {
                handleCleanKeyWords()
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor"
                 className="h-5 w-5 text-gray-500 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
            </svg>
        </div>
    }
    const SearchIconCom = () => {
        return <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                 stroke="currentColor"
                 className="h-5 w-5 text-gray-500 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
            </svg>
        </div>
    }

    const SearchResultCom = () => {
        if (searchResult && keywords) {
            return <div className="flex flex-col">
                <span className="w-full truncate text-black py-2 px-4">搜索&quot;<span>{keywords}</span>&quot;</span>
                {searchResult.map((result, index) => (
                    <div key={index}
                         className={'w-full flex items-center p-2 cursor-pointer hover:bg-gray-100 ' + (index === selectedIndex ? 'bg-gray-100' : '')}>
                        <img src={result.cover} alt="" width={60} height={120} className="mr-3"/>
                        <div className="flex flex-col space-y-1">
                            <div className="font-medium">
                                <HighlightedTextComponent text={result.title} highlight={keywords}/>
                            </div>
                            <div className="text-xs ">
                                <HighlightedTextComponent text={result.author} highlight={keywords}/>
                            </div>
                            <span className="text-black text-xs">{formatDateTime(result.createTime)}</span>
                        </div>
                    </div>
                ))}
            </div>
        }
        return <div></div>
    }
    return (
        <div className="relative">
            <input
                className="border outline-none border-gray-300 rounded p-2  w-full text-black"
                type="text"
                placeholder="Search..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {keywords && <ClearIconCom/>}
                {!keywords && <SearchIconCom/>}
                {loading && <div className="flex items-center justify-center w-full">
                    <div className="animate-spin">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth="1.5"
                             stroke="currentColor" className="h-4 w-4 text-gray-500">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                        </svg>
                    </div>
                </div>}
            </div>
            {(
                isFocused && <div
                    className="absolute z-10 w-full bg-white mt-1 rounded-md shadow-lg max-h-96 overflow-auto"
                    ref={containerRef}>
                    <SearchResultCom/>
                </div>
            )}
        </div>
    );
};

export default SearchComponent;