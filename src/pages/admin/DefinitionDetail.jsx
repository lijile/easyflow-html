import React, { useState, useEffect, } from 'react';
import { connect } from 'umi';
/** 图核心组件 & 类型定义 */
import { XFlow, XFlowCanvas } from '@antv/xflow';
/** 图的各种扩展交互组件 */
import { CanvasMiniMap, CanvasScaleToolbar, CanvasSnapline } from '@antv/xflow';
/** 图的配置项 */
import { useGraphConfig } from './xflow/config-graph';
import { message } from 'antd';
import { getDefinitionDetail } from '@/services/admin';

import './index.less';
import '@antv/xflow/dist/index.css';

function DefinitionDetail({ dispatch, location }) {
  const definitionCode = location?.query?.definition_code;
  /** 画布配置 */
  const graphConfig = useGraphConfig();

  /** 画布渲染数据 */
  const [graphData, setGraphData] = useState(undefined);

  /** XFlow初始化完成的回调 */
  const onLoad = async (app) => {

    const res = await getDefinitionDetail({ definitionCode });
    const { data } = res;
    const { definition, nodeList } = data;

    const nodes = nodeList.map(node => ({
      id: node.nodeCode,
      width: 150,
      height: 40,
      renderKey: 'NODE2',
      info: { text: node.nodeName }
    }));
    nodes.unshift({ id: 'root1', width: 150, height: 40, renderKey: 'NODE1', info: { text: definition.definitionName } });
    const edges = nodeList.map((node, index) => {
      const source = node.parentCode ? node.parentCode : 'root1';
      const { conditionScript } = node;
      return {
        id: 'edge_id_' + index,
        source,
        target: node.nodeCode,
        renderKey: conditionScript && 'EDGE1',
        edgeContentWidth: 100,
        edgeContentHeigt: 30,
        info: node,
      };
    });

    const newGraphData = { nodes, edges };
    setGraphData(newGraphData);

    const graph = await app.getGraphInstance();
    graph.on('node:click', ({ node }) => {
      const nodeData = node.getData();
      message.success(`${nodeData.id}节点被点击了`);
    });
    graph.on('edge:click', ({ edge }) => {
      edge.toFront();
      const edgeData = edge.getData();
      message.success(`${edgeData.id}连线被点击了`);
    });
  };

  useEffect(() => {

  }, []);

  return (
    <XFlow
      className="xflow-user-container"
      graphData={graphData}
      graphLayout={{
        layoutType: 'dagre',
        layoutOptions: {
          type: 'dagre',
          rankdir: 'TB',
          nodesep: 60,
          ranksep: 40,
        },
      }}
      onLoad={onLoad}
      isAutoCenter={true}
    >
      <XFlowCanvas config={graphConfig}>
        <CanvasScaleToolbar position={{ top: 12, left: 12 }} />
        <CanvasMiniMap
          miniMapClz="xflow-custom-minimap"
          nodeFillColor="#ccc"
          minimapOptions={{
            width: 200,
            height: 120,
          }}
          position={{ top: 12, right: 12 }}
        />
        <CanvasSnapline color="#1890ff" />
      </XFlowCanvas>
    </XFlow>
  );
};

export default connect(({ admin }) => ({
  ...admin,
}))(DefinitionDetail);
