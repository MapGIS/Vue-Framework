import { IFilter } from './baselayer';
import { latest } from '../spec/style-spec-china.js';

export const combiningFilterOps = ['all', 'any', 'none']
export const combiningFilterStr = ['全部匹配', '任意匹配', '不匹配'];
export const setFilterOps = ['in', '!in']
export const otherFilterOps = Object
    .keys(latest.filter_operator.values)
    .filter(op => combiningFilterOps.indexOf(op) < 0)

export type FilterOpt = 'all' | 'any' | 'none';

/**
 * @description 图层级别的过滤筛选条件,后期支持嵌套查询
 * @see 可以先这么机械的理解
 * @param filter [opt, rule1, rule2 ....]
 * @param opt = ['all', 'any', 'none']三选一
 * @param rule = ['字段名', match, '匹配值']
 * @param match = ["==":, "!=", ">", ">=", "<", "<=", "in", "!in", "all", "any", "none", "has", "!has"]
 */
export class LayerFilter extends IFilter {
    private filter: Array<any>;

    /*     constructor(opt?: FilterOpt, rules?: Array<any>) {
            super();
            if (opt) {
                this.filter = [opt, ...rules];
            }
        } */

    constructor(filter?: Array<any>) {
        super();
        this.filter = filter;
    }

    getFilterOpt(): FilterOpt {
        if (!this.filter) return 'all';
        if (this.filter.length > 0) {
            if (combiningFilterOps.indexOf(this.filter[0]) >= 0) {
                return this.filter[0];
            } else {
                return 'all';
            }
        }
        return 'all';
    }

    getFilterRules() {
        if (!this.filter) return [];
        if (this.filter.length > 0) {
            return this.filter.slice(1).filter(f=>f);
        }
        return [];
    }

    hasCombiningFilter(filter) {
        return combiningFilterOps.indexOf(filter[0]) >= 0
    }

    hasNestedCombiningFilter(filter) {
        if (this.hasCombiningFilter(filter)) {
            const combinedFilters = filter.slice(1)
            return filter.slice(1).map(f => this.hasCombiningFilter(f)).filter(f => f == true).length > 0
        }
        return false
    }

    /**
     * @description 可以先这么机械的理解，[opt, rule1, rule2 ....]
     * opt = ['all', 'any', 'none']三选一
     * rule = ['字段名', match, '匹配值']
     * match = ["==":, "!=", ">", ">=", "<", "<=", "in", "!in", "all", "any", "none", "has", "!has"]
     */
    combiningFilter() {
        let filter = this.filter || ['all']

        let combiningOp = filter[0]    //  all any none三种过滤规则之一
        let filters = filter.slice(1)  //  过滤规则数组

        if (combiningFilterOps.indexOf(combiningOp) < 0) {
            combiningOp = 'all'
            filters = [filter.slice(0)]
        }

        return [combiningOp, ...filters]
    }

    onFilterPartChanged(filterIdx, newPart) {
        const newFilter = this.combiningFilter().slice(0)
        newFilter[filterIdx] = newPart
        this.filter = newFilter;
    }

    deleteFilterItem(filterIdx) {
        const newFilter = this.combiningFilter().slice(0)
        console.log('Delete', filterIdx, newFilter)
        newFilter.splice(filterIdx + 1, 1)
        this.filter = newFilter;
    }

    addFilterItem = () => {
        const newFilterItem = this.combiningFilter().slice(0)
        newFilterItem.push(['==', '字段名', ''])
        this.filter = newFilterItem;
    }
}
