<?php
namespace Yong\Angularjs\Ui\DataProvider\Product\Form;

use Magento\Catalog\Ui\DataProvider\Product\Form\Modifier\AbstractModifier;
use Magento\Catalog\Api\Data\ProductAttributeInterface;
use Magento\Framework\Stdlib\ArrayManager;
use Magento\Catalog\Model\Locator\LocatorInterface;

use Magento\Framework\UrlInterface;
use Magento\Ui\Component\Container;
use Magento\Ui\Component\Form\Fieldset;
use Magento\Ui\Component\Form;
use Magento\Ui\Component\DynamicRows;

/**
 * Customize Price field
 */
class Modifier extends AbstractModifier
{
    const FIELD_NAME = 'angularjs_swap_data';
    const FIELDSET_NAME = 'angularjs_swap_sets';

    /**
     * @var ArrayManager
     */
    protected $arrayManager;

    /**
     * @var LocatorInterface
     */
    protected $locator;

    private $swapFieldNames;

    /**
     * @param LocatorInterface $locator
     * @param ArrayManager $arrayManager
     */
    public function __construct(
        LocatorInterface $locator,
        ArrayManager $arrayManager,
        $swapFieldNames = [self::FIELD_NAME]
    ) {
        $this->locator = $locator;
        $this->arrayManager = $arrayManager;
        if (!is_array($swapFieldNames)) {
            $swapFieldNames = [$swapFieldNames];
        }
        $this->swapFieldNames = $swapFieldNames;
    }

    /**
     * {@inheritdoc}
     */
    public function modifyMeta(array $meta)
    {
        $this->meta = $meta;
        $this->addFieldset();

        return $this->meta;
    }

    public function modifyData(array $data) {
        return $data;   
    }

    protected function addFieldset()
    {
        $children = [];
        $i = 0;
        foreach($this->swapFieldNames as $swapFieldName) {
            $children[$swapFieldName] = $this->getFieldConfig($swapFieldName, 10*$i++);
        }
        $this->meta = array_replace_recursive(
            $this->meta,
            [
                static::FIELDSET_NAME => [
                    'arguments' => [
                        'data' => [
                            'config' => [
                                'label' =>'',
                                'componentType' => Fieldset::NAME,
                                'dataScope' => 'data',
                                'collapsible' => true,
                                "visible" => true,
                                'sortOrder' => 10,
                            ],
                        ],
                    ],
                    'children' => $children
                ],
            ]
        );

        return $this;
    }

    protected function getFieldConfig($swapFieldName, $sortOrder)
    {
        return [
            'arguments' => [
                'data' => [
                    'config' => [
                        'label' => '',
                        'componentType' => \Magento\Ui\Component\Form\Field::NAME,
                        'formElement' => \Magento\Ui\Component\Form\Element\Input::NAME,
                        'dataScope' => $swapFieldName,
                        'dataType' => \Magento\Ui\Component\Form\Element\DataType\Text::NAME,
                        'sortOrder' => $sortOrder,
                        "visible" => true,
                        'required' => true,
                    ],
                ],
            ],
            'children' => [],
        ];
    }
}
