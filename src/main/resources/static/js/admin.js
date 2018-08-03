BUI.use(['bui/form', 'bui/data', 'bui/grid'],
    function (Form, Data, Grid) {
        $.ajax({
            url: "user/getName.json",
            type: "post",
            async: false,
            success: function (data) {
                if (data.message) {
                    $("#welcome").text(data.message);

                } else {
                    $("#welcome").text("您还未登陆!");
                }
            }
        });
        $.ajax({
            url: "user/getWeekNo.json",
            type: "post",
            async: false,
            success: function (data) {
                if (data.message) {
                    $("#welcomeWeekNo").text(data.message);
                    var date = new Date();
                    $("#startDate").val(date.format("yyyy-MM-dd"));
                    $("#endDate").val(date.format("yyyy-MM-dd"));
                }
            }
        });
        var contextPath = "work/";
        var url_query = contextPath + 'query.json';
        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });
        queryForm.render();
        var columns = [{
            title: "周报类型",
            dataIndex: "type",
            width: '65'
        }, {
            title: "所属项目",
            dataIndex: "projectName",
            width: '60'
        }, {
            title: "任务类型",
            dataIndex: "workType",
            width: '70'
        }, {
            title: "任务名称",
            dataIndex: "workContent",
            width: '100%'
        }, {
            title: "实际开始时间",
            dataIndex: "startDate",
            width: '70'
        }, {
            title: "实际结束时间",
            dataIndex: "endDate",
            width: '70'
        }, {
            title: "工作量",
            dataIndex: "process",
            width: '45'
        },{
            title: "负责人",
            dataIndex: "developer",
            width: '50'
        },{
            title: "完成比率",
            dataIndex: "status",
            width: '50'
        },{
            title: "任务拖延原因/客户评价",
            dataIndex: "remark",
            width: '100'
        },{
            title: "填写日期",
            dataIndex: "createDate",
            width: '70'
        }];

        var store = new Data.Store({
            proxy: {
                method: "POST",
                dataType: "json"
            },
            url: url_query,
            pageSize: 20,
            params: queryForm.toObject(),
            autoLoad: false
        });
        var grid = new Grid.Grid({
            render: '#grid',
            columns: columns,
            width: '100%',
            loadMask: true,
            store: store,
            emptyDataTpl: '<div class="centered"><img alt="Crying" src="custom/img/crying.png"><h2>数据不存在，请检查查询条件</h2></div>',
            bbar: {
                pagingBar: true
            },
            plugins: [Grid.Plugins.RowNumber],
            autoRender: true
        });


        $('#btnSearch').on('click', function () {
            store.load(queryForm.toObject());
        });
        $("#download").on("click",function () {
            queryForm.set("action","admin/download.json");
            queryForm.submit();
        })

    });