'use client';
import React from 'react';
import ReportViewer, { Callbacks, RequestSettings, TemplateEngine } from 'devexpress-reporting-react/dx-report-viewer';
import TreeList from 'devextreme-react/tree-list';
import { IEditorViewModel } from '@devexpress/analytics-core/analytics-widgets-native';

import 'devextreme/dist/css/dx.light.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.common.css';
import '@devexpress/analytics-core/dist/css/dx-analytics.light.css';
import 'devexpress-reporting/dist/css/dx-webdocumentviewer.css';

const BACKEND_URL = 'http://localhost:5000';
let parametersModel: any = undefined;

const CustomParameterEditor = ({data}: {data: IEditorViewModel}) => {
    const dataSource = `${BACKEND_URL}/Home/ListEmployees`;
    const columns = [{ dataField: "name", caption: "Name" }, { dataField: "title", caption: "Title" }];

    const onSelectionChanged = (e: any) => {
      if (e.selectedRowsData.length > 0) {
        var selectedEmployeeID = e.selectedRowsData[0].id;
        parametersModel.p_employeeID = selectedEmployeeID;
      }
    }

  return (
      <TreeList
          dataSource={dataSource}
          columns={columns}
          showBorders={true}
          selection={{ mode: 'single' }}
          selectedRowKeys={data.value}
          onSelectionChanged={onSelectionChanged}
      />
  );
};

export default function Home() {
  const templateEngine = new TemplateEngine();
  templateEngine.setTemplate('employeeID-custom-editor', CustomParameterEditor);

  const onBeforeRender = ({sender}: {sender: any}) => {
      var previewModel = sender.GetPreviewModel();
      previewModel.tabPanel.width = 500;
      parametersModel = previewModel.parametersModel;
  };

  const onCustomizeParameterEditors = React.useCallback(({ args }: { args: any }): void => {
      if (args.parameter.type === 'System.DateTime') {
          args.info.editor = {...args.info.editor};
          args.info.editor.extendedOptions = {
            ...args.info.editor.extendedOptions,
            type: 'date',
            displayFormat: 'dd-MMM-yyyy'
          };
          args.info.validationRules = [{
            type: "range",
            min: new Date(1990, 0, 1),
            message: "No data available prior to the year 1990."
        }];
      };
      if (args.parameter.name == "p_employeeID") {
          args.info.editor = { header: 'employeeID-custom-editor' };
      };
  }, []);

  return (
    <ReportViewer reportUrl="CustomParameterReport" templateEngine={templateEngine}>
      <RequestSettings invokeAction="/DXXRDV" host="http://localhost:5000/" />
      <Callbacks
          CustomizeParameterEditors={onCustomizeParameterEditors}
          BeforeRender={onBeforeRender} />
    </ReportViewer>
  );
}
