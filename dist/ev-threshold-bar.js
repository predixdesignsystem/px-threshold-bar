'use strict';(function(){Polymer({is:'ev-threshold-bar',properties:{/**
       * Holds the min value for the threshold bar.
       *
       * @property
       */min:{type:Number,value:0},/**
       * Holds the max value for the threshold bar.
       *
       * @property
       */max:{type:Number,value:100},/**
       * Prevents the value to be displayed on top of the bar
       *
       */hideValue:{type:Boolean,value:false},/**
       * Prevents the scale to be displayed below the bar
       *
       */hideScale:{type:Boolean,value:false},/**
       * Holds the thresholds configuration.
       * The configuration should be an array of Objects with the following structure:
       * {
       *   min: <A number representing the begining of the threshold>,
       *   max: <A number representing the end of the threshold>,
       *   color: <A valid color for this specific bar (Hex / RGB)>
       * }
       */config:{type:Array,value:function value(){return[]}},/**
       * The current value to be displayed on top of the threshold bar.
       * If this property is null a value won't be show but the threshold bar will still be displayed.
       *
       * @property
       */value:{type:Number,value:null},/**
       * The unit of measure for the value, if any.
       *
       * @property
       */uom:{type:String,value:''},/**
       * Holds the (pixel / range) scale factor used to calculate the threshold bars and value positioning.
       *
       * @property
       * @private
       */_scaleFactor:{type:Number,value:null}},observers:['_configDataChanged(config)','_scaleDataChanged(min)','_scaleDataChanged(max)'],ready:function ready(){this._refreshStyle=false},/**
     * Calculates the width of the specific threshold bars.
     *
     * @param config - The threshold configuration Object
     * @return {string} - The style string
     * @private
     */_getStyles:function _getStyles(config){var width=(config.max-config.min)*this._scaleFactor;return'width: '+width+'px; '+'background-color: '+config.color+';'},/**
     * Observer that calculates the scale factor when the extremes of the threshold bar are changed.
     *
     * @private
     */_scaleDataChanged:function _scaleDataChanged(){var thresholdEl=Polymer.dom(this.root).querySelector('.threshold-bar-container');if(this._checkValuesSet(false)){if(thresholdEl&&thresholdEl.clientWidth){var factor=thresholdEl.clientWidth/(this.max-this.min);this.set('_scaleFactor',factor)}else{setTimeout(function(){this._scaleDataChanged()}.bind(this),100)}}},/**
     * Observer that orders the threshold configuration based on the min property.
     *
     * @param config - The list of threshold configurations
     * @private
     */_configDataChanged:function _configDataChanged(config){if(config&&config.length){var configLen=config.length;config.sort(function(a,b){return a.min-b.min});for(var i=0;i<configLen;i++){config[i]['order']=i}}},/**
     * Calculates the position of the Marker Line in the threshold bar
     *
     * @return {string} - The style string
     * @private
     */_getMarkerLineStyle:function _getMarkerLineStyle(){if(this._checkValuesSet(true)&&this._scaleFactor){var position=Number(this.value),padding=0;if(document.querySelector('.scale-first-value')){padding=window.getComputedStyle(document.querySelector('.scale-first-value'),false)['width'];padding=Number(padding.substr(0,padding.length-2))}position=position>this.max?this.max:position;position=position<this.min?this.min:position;position=position*this._scaleFactor;position=this.hideScale?position:position+padding;return'left: '+position+'px;'}return''},/**
     * Calculates the position of the Marker Icon in the threshold bar
     *
     * @return {string} - The style string
     * @private
     */_getMarkerStyle:function _getMarkerStyle(){if(this._checkValuesSet(true)&&this._scaleFactor){var position=Number(this.value),padding=0;if(document.querySelector('.scale-first-value')){padding=window.getComputedStyle(document.querySelector('.scale-first-value'),false)['width'];padding=Number(padding.substr(0,padding.length-2))}position=position>this.max?this.max:position;position=position<this.min?this.min:position;position=position*this._scaleFactor-4;position=this.hideScale?position:position+padding;return'left: '+position+'px;'}return'display: none;'},/**
     * Calculates the position of the value label in the threshold bar
     *
     * @return {string} - The style string
     * @private
     */_getValueStyle:function _getValueStyle(){var spanEl=Polymer.dom(this.root).querySelector('.threshold-bar-value > span');spanEl.style.display=this.hideValue?'none':'block';if(this._checkValuesSet(true)&&this._scaleFactor){var spanSize=spanEl.clientWidth;if(spanSize){var position=Number(this.value),padding=0;if(document.querySelector('.scale-first-value')){padding=window.getComputedStyle(document.querySelector('.scale-first-value'),false)['width'];padding=Number(padding.substr(0,padding.length-2))}position=position>this.max?this.max:position;position=position<this.min?this.min:position;position=position*this._scaleFactor-spanSize+4;position=position<0?Number(this.value)*this._scaleFactor-4:position;position=this.hideScale?position:position+padding;return'left: '+position+'px;'}else{setTimeout(function(){this._refreshStyle=!this._refreshStyle}.bind(this),100)}}return'display: none;'},/**
     * Verifies that values were set for the base properties min, max and value.
     *
     * @param includeValue - Includes the property value in the check
     * @return {boolean} - Whether the values were set or not
     * @private
     */_checkValuesSet:function _checkValuesSet(includeValue){var min=this.min!==null&&this.min!==undefined,max=this.max!==null&&this.max!==undefined,value=this.value!==null&&this.value!==undefined;return includeValue?min&&max&&value:min&&max},_hideScale:function _hideScale(){return this.hideScale?'hide-scale':''}})})();
//# sourceMappingURL=ev-threshold-bar.js.map
