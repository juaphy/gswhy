CKEDITOR.editorConfig = function(config){
	config.removePlugins = 'elementspath', //去掉底部一行的元素路径显示
	config.resize_enabled = false;
	config.toolbarCanCollapse=false;
	config.language = 'zh-cn'; 				// 配置语言  
	config.uiColor = '#FFF'; 					// 背景颜色  
	config.width = '700px'; 						// 宽度  
	config.height = '220px'; 					// 高度  
	config.skin = 'chris';				//界面v2,kama,office2003  
	config.font_defaultLabel = 'Arial';
	config.fontSize_defaultLabel = '14';
	config.fontSize_sizes='14/22px;16/24px;18/26px;24/28px;30/32px;';
	config.toolbar = 'GewaToolbar';   
	config.toolbar_GewaToolbar = [
		['FontSize','Bold','Italic','Strike','TextColor','JustifyLeft', 'JustifyCenter', 
		'JustifyRight','Link','Unlink','Table','Image','Flash','Preview']
    ];
};
CKEDITOR.config.filebrowserImageUploadUrl = '/common/memberUploadPicture.xhtml';