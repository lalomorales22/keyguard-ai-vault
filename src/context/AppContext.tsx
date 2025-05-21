
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface ApiKey {
  id: string;
  name: string;
  displayName: string;
  key: string;
  url: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

interface AppContextType {
  apiKeys: ApiKey[];
  categories: Category[];
  addApiKey: (apiKey: Omit<ApiKey, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateApiKey: (id: string, apiKey: Partial<ApiKey>) => void;
  deleteApiKey: (id: string) => void;
  addCategory: (name: string) => void;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  copyApiKey: (key: string) => void;
  copyExportCommand: (name: string, key: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const saved = localStorage.getItem('apiKeys');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse apiKeys from localStorage', e);
      return [];
    }
  });
  
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      if (parsed.length === 0) {
        // Add default category if none exist
        const defaultCategory = {
          id: 'default',
          name: 'General',
          createdAt: new Date().toISOString(),
        };
        return [defaultCategory];
      }
      return parsed;
    } catch (e) {
      console.error('Failed to parse categories from localStorage', e);
      return [];
    }
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
  }, [apiKeys]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addApiKey = (newApiKey: Omit<ApiKey, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const apiKey = {
      ...newApiKey,
      id: crypto.randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    setApiKeys(prev => [...prev, apiKey]);
    toast.success('API Key added successfully');
  };

  const updateApiKey = (id: string, updatedData: Partial<ApiKey>) => {
    setApiKeys(prev => 
      prev.map(key => 
        key.id === id 
          ? { ...key, ...updatedData, updatedAt: new Date().toISOString() } 
          : key
      )
    );
    toast.success('API Key updated successfully');
  };

  const deleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id));
    toast.success('API Key deleted');
  };

  const addCategory = (name: string) => {
    const newCategory = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    setCategories(prev => [...prev, newCategory]);
    toast.success('Category added successfully');
    return newCategory.id;
  };

  const updateCategory = (id: string, name: string) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id 
          ? { ...category, name } 
          : category
      )
    );
    toast.success('Category updated successfully');
  };

  const deleteCategory = (id: string) => {
    // First check if there are any API keys using this category
    const keysInCategory = apiKeys.filter(key => key.categoryId === id);
    
    if (keysInCategory.length > 0) {
      // Move them to the default category or the first available category
      const defaultCategoryId = categories.find(c => c.id === 'default')?.id || 
                               (categories.length > 0 ? categories[0].id : null);
      
      if (defaultCategoryId) {
        setApiKeys(prev => 
          prev.map(key => 
            key.categoryId === id 
              ? { ...key, categoryId: defaultCategoryId } 
              : key
          )
        );
      }
    }
    
    setCategories(prev => prev.filter(category => category.id !== id));
    
    // If we were viewing the deleted category, switch to null (all)
    if (selectedCategory === id) {
      setSelectedCategory(null);
    }
    
    toast.success('Category deleted');
  };

  const copyApiKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success('API Key copied to clipboard');
  };

  const copyExportCommand = (name: string, key: string) => {
    const exportName = name.toUpperCase().replace(/[^A-Z0-9_]/g, '_');
    navigator.clipboard.writeText(`export ${exportName}=${key}`);
    toast.success('Export command copied to clipboard');
  };

  return (
    <AppContext.Provider
      value={{
        apiKeys,
        categories,
        addApiKey,
        updateApiKey,
        deleteApiKey,
        addCategory,
        updateCategory,
        deleteCategory,
        isAuthenticated,
        setIsAuthenticated,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        copyApiKey,
        copyExportCommand,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
