# 常见警告&处理方式
在编译TypeScript的出现很多常见警告以及处理方式

::: tip
本手册不是从网上随便抄来的，而是经过MapGIS实际开发总结得出的经验！
:::

[英文官方网址](https://palantir.github.io/tslint/rules/) [中文官方网址](https://www.tslang.cn/docs/handbook/error.html)

## 强烈建议解决的警告
列表如下

|序号|说明|中文描述 | 解决方式| 特例|
|:---|:---|:---|:---|:---|
|1|`== should be ===  or != should be !== `|`== 换成 === `|直接替换|无|
|2| `non-arrow functions are forbidden`||必须使用箭头函数|无|
|3| `Parentheses are required around the parameters of an arrow function definition`|`c => {}| (c) => {}`|无|
|4| `Spaces before function parens are disallowed`|`function (a)`|去掉函数参数前的空格|无|
|5|`Forbidden 'var' keyword, use 'let' or 'const' instead`|禁止使用var|`var a --> let a`|无|
|6| `comment must start with a space`|注释前必须有一个空格|//... --> // ...|无|
|7| `Unnecessary initialization to 'undefined'|没必要初始化的时候附undefined值`|`let a = undefined --> let a`|无|
|8| `Don't use 'String' as a type. Avoid using the String type. Did you mean string?`| 使用string替代String|`String -> string`|无|
|9|`Array type using 'Array<T>' is forbidden for simple types. Use 'T[]' instead`|`简单类型数据建议使用T[]`|`Array<T> --> T[]`|无|
|10|`file should end with a newline`|文件结束应新起一行|EOF|无|
|11|`class method 'setBase' must be marked either 'private', 'public', or 'protected'`|需要修饰符|`增加public修饰或者tslint.json添加"member-access": false`|无|
|12|`A maximum of 1 class per file is allowed.`|一个文件只能导出一个类|`// tslint:disable-next-line:max-classes-per-file`|无|
|13|block is empty | 代码块为空|删除空白处|无|
|14|`misplaced 'else`' | 缺少else|补足else|无|
|15|`for (... in ...) statements must be filtered with an if statement`||`for (let key in sources) -> for (const key of Object.keys(sources))`|无|
|16| `Shadowed name: 'types'`|影子变量|一般发生在全局定义了一个对象，函数内部定义了同名对象|无|


## 需要区分的警告
|序号|说明|中文描述 | 解决方式| 特例|
|:---|:---|:---|:---|:---|
|1| `Identifier 'UuidStr' is never reassigned; use 'const' instead of 'let'` | 后面不改变的对象使用const |` 1.let a --> const a   2. // tslint:disable-next-line: prefer-const `|  `1.返回的对象在当前代码段没有修改，作为返回值后修改，可能其他地方会修改：deepCopy()  2. 数组` |
|2|`object access via string literals is disallowe`d|不允许使用字符串的形式访问对象属性|`使用set/get来替代`|`地图属性里面使用了"-"符号,"line-color"`|
|3|`Expected a 'for-of' loop instead of a 'for' loop with this simple iteration`|`简单循环需要使用for-of语法`|`换成for-of 或者 循环里面有跳出语法 tslint:disable-next-line:prefer-for-of `|无|

## 可以忽视的警告

|序号|说明|中文描述 | 解决方式| 原因|
|:---|:---|:---|:---|:---|
|1| Forbidden bitwise operation|禁止使用位运算符|地图中存在大量使用位运算的技巧，这个警告只能忽略/屏蔽| // tslint:disable-next-line: no-bitwise|防止 bool1 && bool2 -> bool1 & bool2|
|2|结尾是否需要;号||个人编程风格，按需设置|
|3|引号是双引号还是单引号|"quotemark": [false, "single"]|个人编程风格，按需设置|
|4|indent是2空格还是4空格|"indent": [false, "spaces", 2]|个人编程风格，按需设置|


