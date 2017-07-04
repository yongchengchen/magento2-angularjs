<?php

namespace Yong\Angularjs\Block\Adminhtml;

use Magento\Backend\Block\Widget\Tab;
use Magento\Backend\Block\Widget\Tabs;
use Magento\Backend\Block\Widget;

class ContainerTab extends Tab {
    private static $resource_rendered = false;
    protected function renderResource() {
        if (!self::$resource_rendered) {
            self::$resource_rendered = true;
            return sprintf('
                <link href="%s" rel="stylesheet" type="text/css">',
                $this->getViewFileUrl('Yong_Angularjs::css/bootstrap.min.css'));
        }
        return '';
    }
    /**
     * Prepare html output
     *
     * @return string
     */
    protected function _toHtml() {
        if ($this->hasData('child_templates')) {
            foreach($this->getData('child_templates') as $name => $childTemplate) {
                $child = $this->addChild($name,
                    'Magento\Backend\Block\Widget', 
                    ['template'=>$childTemplate]
                );
            }
        }
        
        return $this->renderResource() . $this->getChildHtml();
    }
}
