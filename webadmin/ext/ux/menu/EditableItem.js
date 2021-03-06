Ext.namespace("Ext.ux.menu");
Ext.ux.menu.EditableItem = Ext.extend(Ext.menu.BaseItem, {
    itemCls : "x-menu-item",
    hideOnClick: false,
    
    initComponent: function(){
    	this.addEvents({keyup: true});
    	
	this.editor = this.editor || new Ext.form.TextField();
	if(this.text)
		this.editor.setValue(this.text);
    },
    
    onRender: function(container){
        var s = container.createChild({
        	cls: this.itemCls,
        	html: '<img src="' + this.icon + '" class="x-menu-item-icon" style="margin: 3px 3px 2px 2px;" />'});
        
        Ext.apply(this.config, {width: 125});
        this.editor.render(s);
        
        this.el = s;
        this.relayEvents(this.editor.el, ["keyup"]);
        
	this.editor.el.dom.onkeypress=function(event) {
	    if(Ext.isIE) window.event.cancelBubble=true;
	    else event.stopPropagation();
	    return true;
	}
	
	this.editor.el.dom.onkeydown=function(event) {
	    if(Ext.isIE) window.event.cancelBubble=true;
	    else event.stopPropagation();
	    return true;
	}
	
	if(Ext.isGecko)
			s.setStyle('overflow', 'auto');
			
        Ext.ux.menu.EditableItem.superclass.onRender.apply(this, arguments);
    },
    
    getValue: function(){
    	return this.editor.getValue();
    },
    
    setValue: function(value){
    	this.editor.setValue(value);
    },
    
    isValid: function(preventMark){
    	return this.editor.isValid(preventMark);
    }
});