BUI.use(['bui/form', 'bui/data', 'bui/grid','bui/select'],
    function (Form, Data, Grid,Select) {
        // $.ajax({
        //     url: "user/getName.json",
        //     type: "post",
        //     async: false,
        //     success: function (data) {
        //         if (data.message) {
        //             $("#welcome").text(data.message);
        //             $("#developer").val(data.message);
        //         } else {
        //             $("#welcome").text("您还未登陆!");
        //         }
        //     }
        // });
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
        var url_update = contextPath + 'update.json';
        var url_insert = contextPath + 'insert.json';
        var url_delete = contextPath + 'delete.json';

        // 获取项目列表下拉框
        function initProject() {
            $("#projectId option").remove();
            var project = $("#projectId");
            $.ajax({
                url: "/project/queryAll.json",
                type: 'post',
                async: false,
                success: function(data) {
                    $.each(data,function(name,value){
                        project.append("<option value='"+value.id+"'>"+value.name+"</option>");
                    });
                }
            });
            project.append("<option value=''>其他,右边填写</option>");
        }
        initProject();
        var queryForm = new Form.HForm({
            srcNode: '#queryForm',
            autoRender: true
        });

        var columns = [{
            title: "周报类型",
            dataIndex: "type",
            width: '65'
        }, {
            title: "所属项目",
            dataIndex: "projectName",
            width: '60'
        },{
            title: "负责人",
            dataIndex: "developer",
            width: '50'
        }, {
            title: "任务类型",
            dataIndex: "workType",
            width: '70'
        },  {
            title: "需求/问题任务",
            dataIndex: "workContent",
            width: '100%'
        }, {
            title: "工作量",
            dataIndex: "process",
            width: '45'
        }, {
            title: "开始时间",
            dataIndex: "startDate",
            width: '70'
        }, {
            title: "结束时间",
            dataIndex: "endDate",
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
            autoLoad: true
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
            plugins: [Grid.Plugins.RadioSelection],
            autoRender: true
        });

        var codeForm = new Form.HForm({
            srcNode: '#codeForm'
        });
        codeForm.render();

        grid.on('itemclick', function (ev) {
            codeForm.enable();
            var item = ev.item;
            codeForm.setRecord(item);
            codeForm.disable();
        });

        $('#btnSearch').on('click', function () {
            store.load(queryForm.toObject());
        });
        function enableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', false);
        }

        function disableBtnEdit() {
            $('#btnSave, #btnReset').attr('disabled', true);
        }

        codeForm.disable();
        disableBtnEdit();
        var operation = '';

        $('#add').on('click', function () {

            operation = 'add';
            codeForm.enable();
            enableBtnEdit();

            codeForm.clearFields();
            codeForm.valid();
        });

        $('#edit').on('click', function () {
            var item = grid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择记录', 'error');
                return;
            }

            operation = 'edit';
            enableBtnEdit();
            codeForm.enable();
        });

        $('#delete').on('click', function () {
            var item = grid.getSelected();

            if (item == null) {
                BUI.Message.Alert('请选择要删除的记录', 'error');
                return;
            }

            BUI.Message.Confirm("确定要删除当前记录吗？", function () {
                $.ajax({
                    url: url_delete,
                    type: 'post',
                    data: {id: item.id},
                    success: function (data) {
                        if (data.success) {
                            BUI.Message.Alert('删除成功', 'success');
                            store.load(queryForm.toObject());
                        } else {
                            BUI.Message.Alert(data.message, 'error');
                        }
                    }
                })

            }, 'question');

        });
        $('#btnReset').on('click', function () {
            if (operation === 'edit') {
                var item = grid.getSelected();
                codeForm.setRecord(item);
            } else if (operation === 'add') {
                codeForm.clearFields();
            }
        });

        $('#btnSave').on('click', function () {
            if (!codeForm.isValid()) {
                return;
            }

            var data = codeForm.toObject();
            disableBtnEdit();
            codeForm.disable();
            if (operation === 'add') {
                $.ajax({
                    url: url_insert,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        initProject();
                        if (data.success) {
                            BUI.Message.Alert('添加成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.message, 'error');
                            enableBtnEdit();
                            codeForm.enable();
                        }
                    }
                });

            } else if (operation === 'edit') {
                var item = grid.getSelected();
                data.id = item.id;
                $.ajax({
                    url: url_update,
                    type: 'post',
                    data: data,
                    success: function (data) {
                        initProject();
                        if (data.success) {
                            BUI.Message.Alert('修改成功', 'success');
                            store.load();
                        } else {
                            BUI.Message.Alert(data.message, 'error');
                            enableBtnEdit();
                            codeForm.enable();
                        }
                    },
                    error:function (data) {
                        console.log(data)
                    }
                })
            }
        });

    });