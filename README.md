<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/805269988/24.1.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1234782)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# Reporting for React - Customize Parameter Editor in the Web Document Viewer

This example demonstrates two ways to customize a parameter editor:
- Specify editor options for a default parameter editor.
- Use a template to replace a default editor for a specific parameter type.

![Web Document Viewer - Parameter Panel](images/screenshot.png)

## Quick Start 

### Server

In the *backend* folder, run the following command:

```
dotnet run
```

The server uses `http://localhost:5000`. To debug the server, run the application within Visual Studio.

### Client

In the *react-document-viewer* folder, run the following commands:

```
npm install
npm run dev
```

Enter the following URL in your browser to view results: `http://localhost:3000/`. 

## Implementation Details

### Use a Custom Editor Template

Use the DevExtreme [TreeList](https://js.devexpress.com/React/Documentation/Guide/UI_Components/TreeList/Getting_Started_with_TreeList/) component as a template for the *Employee ID* parameter's value editor:

```ts
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
```

To register the template, pass the template name and the template itself to the `templateEngine.setTemplate` method:

```ts
templateEngine.setTemplate('employeeID-custom-editor', CustomParameterEditor);
```

In the `CustomizeParameterEditors` event handler, set the [header](https://docs.devexpress.com/XtraReports/js-DevExpress.Analytics.Utils.IEditorInfo?p=netframework#js_devexpress_analytics_utils_ieditorinfo_header) property to the template name for the *p_employeeID* parameter:

```ts
const onCustomizeParameterEditors = React.useCallback(({ args }: { args: any }): void => {
      if (args.parameter.name == "p_employeeID") {
          args.info.editor = { header: 'employeeID-custom-editor' };
      };
  }, []);
```

### Customize a Standard Editor

Use the `CustomizeParameterEditors` event to change the display format and set validation rules for parameters. Check the parameter type and update settings accordingly:
- Use the [extendedOptions](https://docs.devexpress.com/XtraReports/js-DevExpress.Analytics.Utils.IEditorInfo?p=netframework#js_devexpress_analytics_utils_ieditorinfo_extendedoptions) property to specify display format in the value editor.
- Use the [validationRules](https://docs.devexpress.com/XtraReports/js-DevExpress.Analytics.Utils.ISerializationInfo?p=netframework#js_devexpress_analytics_utils_iserializationinfo_validationrules) property to set rules to validate the value entered in the editor.

```ts
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
}, []);
```

## Files to Review

- [page.tsx](react-document-viewer/src/app/page.tsx)
- [HomeController.cs](backend/Controllers/HomeController.cs)

## Documentation

- [Reporting for React](https://docs.devexpress.com/XtraReports/119338)

## More Examples

- [Reporting for React - Add a Web Document Viewer to a React App](https://github.com/DevExpress-Examples/reporting-react-integrate-web-document-viewer)
- [Reporting for React - Customize Viewer Toolbar](https://github.com/DevExpress-Examples/reporting-react-customize-viewer-toolbar)
<!-- feedback -->
## Does this example address your development requirements/objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=reporting-react-customize-parameter-editor&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=reporting-react-customize-parameter-editor&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
