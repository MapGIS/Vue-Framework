/* export const combiningFilterOps = ['all', 'any', 'none']
   export const combiningFilterStr = ['全部匹配', '任意匹配', '不匹配'];
   export const setFilterOps = ['in', '!in'] */
export enum FilterOpt {
    "all",
    "any",
    "none",
}

/**
 * @description 图层级别的过滤筛选条件,后期支持嵌套查询
 * @see 可以先这么机械的理解
 * @param filter [opt, rule1, rule2 ....]
 * @param opt = ['all', 'any', 'none']三选一
 * @param rule = ['字段名', match, '匹配值']
 * @param match = ["==":, "!=", ">", ">=", "<", "<=", "in", "!in", "all", "any", "none", "has", "!has"]
 */
export class Filter {
    combiningFilterOps = ["all", "any", "none"];
    combiningFilterStr = ["全部匹配", "任意匹配", "不匹配"];
    setFilterOps = ["in", "!in"];

    private filter: any[];

    /*     constructor(opt?: FilterOpt, rules?: Array<any>) {
           super();
           if (opt) {
           this.filter = [opt, ...rules];
           }
           } */

    constructor(filter?: any[]) {
        this.filter = filter;
    }

    getFilterOpt() {
        if (!this.filter) {
            return "all";
        }
        if (this.filter.length > 0) {
            if (this.combiningFilterOps.indexOf(this.filter[0]) >= 0) {
                return this.filter[0];
            } else {
                return "all";
            }
        }
        return "all";
    }

    getFilterRules() {
        if (!this.filter) {
            return [];
        }
        if (this.filter.length > 0) {
            return this.filter.slice(1).filter((f) => f);
        }
        return [];
    }

    hasCombiningFilter(filter) {
        return this.combiningFilterOps.indexOf(filter[0]) >= 0;
    }

    hasNestedCombiningFilter(filter) {
        if (this.hasCombiningFilter(filter)) {
            const combinedFilters = filter.slice(1);
            return (
                filter
                    .slice(1)
                    .map((f) => this.hasCombiningFilter(f))
                    .filter((f) => f === true).length > 0
            );
        }
        return false;
    }

    /**
     * @description 可以先这么机械的理解，[opt, rule1, rule2 ....]
     * opt = ['all', 'any', 'none']三选一
     * rule = ['字段名', match, '匹配值']
     * match = ["==":, "!=", ">", ">=", "<", "<=", "in", "!in", "all", "any", "none", "has", "!has"]
     */
    combiningFilter() {
        const filter = this.filter || ["all"];

        let combiningOp = filter[0]; //  all any none三种过滤规则之一
        let filters = filter.slice(1); //  过滤规则数组

        if (this.combiningFilterOps.indexOf(combiningOp) < 0) {
            combiningOp = "all";
            filters = [filter.slice(0)];
        }

        return [combiningOp, ...filters];
    }

    onFilterPartChanged(filterIdx, newPart) {
        const newFilter = this.combiningFilter().slice(0);
        newFilter[filterIdx] = newPart;
        this.filter = newFilter;
    }

    deleteFilterItem(filterIdx) {
        const newFilter = this.combiningFilter().slice(0);
        newFilter.splice(filterIdx + 1, 1);
        this.filter = newFilter;
    }

    addFilterItem = () => {
        const newFilterItem = this.combiningFilter().slice(0);
        newFilterItem.push(["==", "字段名", ""]);
        this.filter = newFilterItem;
    };
}
