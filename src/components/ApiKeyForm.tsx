
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp, ApiKey } from '@/context/AppContext';

interface ApiKeyFormProps {
  initialData?: ApiKey;
  onSubmit?: () => void;
  onCancel?: () => void;
  isEditing?: boolean;
}

const ApiKeyForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}: ApiKeyFormProps) => {
  const { categories, addApiKey, updateApiKey } = useApp();
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    displayName: initialData?.displayName || '',
    key: initialData?.key || '',
    url: initialData?.url || '',
    categoryId: initialData?.categoryId || (categories[0]?.id || '')
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({ ...prev, categoryId: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && initialData) {
      updateApiKey(initialData.id, {
        ...formData
      });
    } else {
      addApiKey({
        ...formData
      });
    }
    
    if (onSubmit) onSubmit();
  };

  // Generate a placeholder API key for the input field
  const generatePlaceholderKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Environment Variable Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="API_KEY_NAME"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-white/5 border-white/10"
        />
        <p className="text-xs text-white/60">
          Used for export commands (e.g. export API_KEY_NAME=...)
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          name="displayName"
          placeholder="My API Key"
          value={formData.displayName}
          onChange={handleChange}
          required
          className="bg-white/5 border-white/10"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="key">API Key</Label>
        <Input
          id="key"
          name="key"
          placeholder={generatePlaceholderKey()}
          value={formData.key}
          onChange={handleChange}
          required
          className="font-mono bg-white/5 border-white/10"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="url">Documentation URL (Optional)</Label>
        <Input
          id="url"
          name="url"
          placeholder="https://api.example.com/docs"
          value={formData.url}
          onChange={handleChange}
          type="url"
          className="bg-white/5 border-white/10"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={formData.categoryId}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="bg-white/5 border-white/10">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-white/10">
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-white/10 hover:bg-white/10"
          >
            Cancel
          </Button>
        )}
        <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
          {isEditing ? 'Update API Key' : 'Add API Key'}
        </Button>
      </div>
    </form>
  );
};

export default ApiKeyForm;
