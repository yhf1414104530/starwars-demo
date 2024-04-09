export interface MockItemListType {
    cover: string
    title: string
    createTime: string
    author: string
}

/**
 * 基础数据
 */
export interface BaseResult<T> {
    code?: number;
    msg?: string;
    data?: T;
    totalSize?: number;
    pageSize?: number;
    pageNum?: number;
}
