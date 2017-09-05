<?php

/**
 * Service Container
 *
 * @copyright Copyright (C) 2015 dewanee (http://dewanee.com/).
 * @author Gustavo García (http://dewanee.com/gustavogarcia)
 * @license http://www.gnu.org/licenses/gpl-3.0.html GNU General Public License v3
 */
class ServiceContainer {

    /**
     * The list of services
     *
     * @var array
     */
    protected $services = [];
    
    protected $data = [];

    /**
     * Register a service.
     *
     * @param $service
     * @param $callback
     * @param $priority
     * @return ServiceContainer
     */
    public function register($service, $callback = null, $priority = 0) {
	
		if (!is_array($service)) {
			$service = [$service];
		}
		
		$this->_map('do', $service, $callback, $priority);
		
		return $this;
		
	}
	
	private function _map($type, $services, $callback, $priority) {
	
		if (is_int($callback)) {
			$priority = $callback;
			$callback = null;
		}
		
		foreach($services as $service => $options) {
		
			if (is_int($service)) {
				$service = $options;
				$options = [$callback, $priority];
			} else if (is_int($options)) {
				$options = [$callback, $options];
			} else if (!is_array($options) || !isset($options[1]) || !is_int($options[1])) {
				$options = [$options, $priority];
			}
			
			$service = strtolower($service);
		
			if (!isset($this->services[$service])) {
				$this->services[$service] = [
					'do' => [],
					'before' => [],
					'after' => []
				];
			}

			if (empty($this->services[$service][$type])) {
				$this->services[$service][$type] = [
					true,  // If there's only one item, it's sorted
					[$options[1]],
					[$options[0]]
				];
			} else {
				$this->services[$service][$type][0] = false; // marked as unsorted
				$this->services[$service][$type][1][] = $options[1];
				$this->services[$service][$type][2][] = $options[0];
			}
			
		}
		
    }

    /**
     * Calls a service.
     *
     * This method will return true if 0 or more services were succesfully
     * called. false is returned if one of the services broke the servuce chain.
     *
     * @param string $service
     * @param $arguments
     * @return bool
     */
    public function call($service, $arguments) {
	
		$service = strtolower($service);
		$this->_invoke('before', $service, $arguments);
		$result = $this->_invoke('do', $service, $arguments);
		$this->_invoke('after', $service, $arguments);
		
		return $result;
		
	}

	private function _invoke($type, $service, $arguments) {
	
		foreach ($this->_services($type, $service) as $serviceCallable) {
		
			if (is_object($serviceCallable)) {
				$serviceCallable = [$serviceCallable];
			}
			
			if (is_array($serviceCallable) && empty($serviceCallable[1])) {
				$serviceCallable[1] = $this->_defaultServiceMethod($type, $service);
			}

            $result = call_user_func_array($serviceCallable, $arguments);
            if ($result === false) {
                return false;
            }
			
		}

        return true;

    }
	
	private function _defaultServiceMethod($type, $service) {
	
		$tokens = explode('.', $service);
		
		if (count($tokens) == 1) {
			return $type . ucfirst($service);
		} else {
			return $type . implode('', array_map('ucfirst', array_slice($tokens, 1)));
		}
		
	}

    /**
     * Returns the list of services for a service name and type.
     *
     * The list is returned as an array, and the list of services are sorted by
     * their priority.
     *
     * @param string $type
	 * @param string $service
     * @return callable[]
     */
    private function _services($type, $service) {
	
		$services = [];
		$parts = explode('.', $service);
		
		while (count($parts) > 0) {
		
			$serviceName = implode('.', $parts);
			array_pop($parts);

			if (!isset($this->services[$serviceName]) || empty($this->services[$serviceName][$type])) {
				continue;
			}

			// The list is not sorted
			if (!$this->services[$serviceName][$type][0]) {

				// Sorting
				array_multisort($this->services[$serviceName][$type][1], SORT_DESC, SORT_NUMERIC, $this->services[$serviceName][$type][2]);

				// Marking the services as sorted
				$this->services[$serviceName][$type][0] = true;
			}

			$services += $this->services[$serviceName][$type][2];
			
		}
		
		return $services;

    }

	public function __set($name, $value)
    {
        $this->data[$name] = $value;
    }

    public function __get($name)
    {
        if (array_key_exists($name, $this->data)) {
            return $this->data[$name];
        }

        return null;
    }

    public function __isset($name)
    {
        return isset($this->data[$name]);
    }

    public function __unset($name)
    {
        unset($this->data[$name]);
    }

}
