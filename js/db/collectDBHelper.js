import realmCollect from './realmCollect';

const TABLE_NAME = 'Collect';

/**
 * 添加收藏
 * title 标题
 * url   链接url
 */
export function addCollect(title, url) {
    let newCollect = {
        title,
        url,
        time: new Date()
    };
    realmCollect.write(() => {
        realmCollect.create(TABLE_NAME, newCollect);
    });

    return newCollect;
}

/**
 * 获取全部收藏
 */
export function getCollects() {
    let tempDatas = realmCollect.objects(TABLE_NAME);
    if (null === tempDatas) {
        return [];
    }

    return [...realmCollect.objects(TABLE_NAME).sorted('time', true)];
}

/**
 * 获取是否已经收藏
 */
export function isCollect(url) {
    let tempObj = realmCollect.objects(TABLE_NAME).filtered(`url = "${url}"`);
    return null !== tempObj && tempObj.length > 0;
}

/**
 * 根据url删除收藏
 */
export function removeCollect(url) {
    let tempObj = realmCollect.objects(TABLE_NAME).filtered(`url = "${url}"`);
    console.log('coll', tempObj);
    if (null !== tempObj && tempObj.length > 0) {
        realmCollect.write(() => {
            realmCollect.delete(tempObj);
        });
        return true;
    }
    return false;
}