import React, { useEffect } from 'react';
import { Card, Table } from 'antd';
import { connect, Link } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';

const DefinitionList = ({ definitionList, dispatch }) => {

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '流程定义',
			render: (text, record) => <Link to={`/admin/definition/detail?definition_code=${record.definitionCode}`}>{record.definitionCode}</Link>,
		},
		{
			title: '流程名称',
			dataIndex: 'definitionName',
		},
	];

	useEffect(() => {
		dispatch({
			type: 'admin/listDefinition',
			payload: {},
		});
	}, []);

	return (
		<PageContainer>
			<Table
				rowKey="definitionCode"
				columns={columns}
				dataSource={definitionList}
			/>
		</PageContainer>
	)
}
export default connect(({ admin }) => ({
	...admin,
}))(DefinitionList);