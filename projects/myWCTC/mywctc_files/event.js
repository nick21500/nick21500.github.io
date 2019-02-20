Event = function ()
{
    this.subscribers = new Array();
    this.functionNames = new Array();
};

Event.prototype = {
    subscribe: function(eventHandler)
    {
        //Check if exists
        if(!this._handlerDoesExist(eventHandler))
        {
            this.subscribers.push(eventHandler);
            var functionName = this._getFunctionName(eventHandler);
            this.functionNames.push(functionName);
        }
    },

    fireEvent: function(args)
    {
        var deleteIndexs = new Array();
        for(var i = 0; i < this.subscribers.length; i++)
        {
            var type = typeof this.subscribers[i];
            
            if( type != "undefined" && type == "function")
            {
                try
                {
                    if(!args)
                    {
                        args = {};
                    }
                    this.subscribers[i](args);
                }
                catch(e)
                {
                    //Assume an error occurs. It may be due to DOM objects
                    //that this function is working on does not exist, so delete.
                    //Can cause problems...need to fix this.
                    deleteIndexs.push(i);
                }
            }
        }

        var numberDeleted = 0;
        for(var i = 0; i < deleteIndexs.length; i++)
        {
            this._delete(deleteIndexs[i] - numberDeleted);
            numberDeleted++;
        }
    },

    unsubscribeAll: function() {
        for (var i=this.subscribers.length-1; i>-1; i--) 
        {
            this._delete(i);
        }

        this.subscribers=[];

        return i;
    },

    unsubscribe: function(eventHandler) 
    {
        var functionNameToDelete = this._getFunctionName(eventHandler);
        for (var i=this.subscribers.length-1; i>-1; i--) 
        {
            if(this._getFunctionName(this.subscribers[i]) == functionNameToDelete)
            {
                this._delete(i);
            }
        }
        return i;
    },
    
    _handlerDoesExist: function(eventHandler)
    {
        for(var i = 0; i < this.subscribers.length; i++)
        {
            var functionName = this._getFunctionName(eventHandler);
            var existingFn = this.functionNames[i];
            if(existingFn == functionName)
            {
                return true;
            }
        }
        return false;
    },

    _delete: function(index)
    {
        this.subscribers.splice(index,1);
        this.functionNames.splice(index,1);
    },

    _getFunctionName: function(eventHandler)
    {
        var m = eventHandler.toString().match(/^\s*function\s+([^\s\(]+)/);
        return m ? m[1] : "";
    }
};