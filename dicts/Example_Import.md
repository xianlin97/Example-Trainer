## 本地词典 JSON 格式

导入的词典文件需要是一个 JSON 对象。应用主要读取 `topics` 下的四层学习数据：

```text
topics[]
  centers[]
    expressions[]
      examples[]
```

完整数据结构建议如下：

```text
Dictionary
  schemaVersion
  dictionaryId
  name
  stats
    topics
    centers
    expressions
    examples
  topics[]
    id
    order
    word
    centers[]
      id
      order
      secNumber
      english
      chinese
      expressions[]
        id
        order
        text
        gram
        labels[]
        explanation
        examples[]
          id
          order
          english
          chinese
```

字段说明：

- `schemaVersion`：词典 JSON 结构版本，例如 `"1.0"`。
- `dictionaryId`：词典唯一 ID，用于区分多个导入词典。
- `name`：词典显示名称。
- `stats`：词典统计信息，包含 `topics`、`centers`、`expressions`、`examples` 的数量。
- `topics`：Topic 数组，是应用读取词典内容的入口。

`topic` 字段：

- `id`：Topic 稳定 ID。
- `order`：Topic 在词典中的顺序。
- `word`：Topic 词或章节标题。
- `centers`：当前 Topic 下的中心表达数组。

`center` 字段：

- `id`：中心表达稳定 ID。
- `order`：中心表达在当前 Topic 下的顺序。
- `secNumber`：中心表达编号；如果原始资料没有编号，可以按顺序生成 `"1"`、`"2"`、`"3"`。
- `english`：中心表达英文释义或分类。
- `chinese`：中心表达中文释义或分类。
- `expressions`：当前中心表达下的二级表达数组。

`expression` 字段：

- `id`：二级表达稳定 ID。
- `order`：二级表达在当前 center 下的顺序。
- `text`：二级表达正文。
- `gram`：词性、语法信息；没有时可为空字符串。
- `labels`：标签数组，例如英式、美式、正式、非正式等；没有时用空数组。
- `explanation`：表达解析文本；没有时可为空字符串。
- `examples`：当前表达下的例句数组。允许为空数组。

`example` 字段：

- `id`：例句稳定 ID，应用会用它关联练习记录、笔记和复习历史。
- `order`：例句在当前 expression 下的顺序。
- `english`：参考英文例句，提交后作为标准答案显示。
- `chinese`：中文例句，练习时作为翻译提示显示。

最低要求：

- 根节点必须是对象。
- 必须包含 `topics` 数组。
- 每个 `topic` 建议包含 `word` 和 `centers`。
- 每个 `center` 建议包含 `english`、`chinese` 和 `expressions`。
- 每个 `expression` 建议包含 `text` 和 `examples`。
- 每个 `example` 需要包含 `english` 和 `chinese`。

应用展示顺序优先按数组顺序读取；`order` 字段用于辅助校验、导出和后续扩展。
