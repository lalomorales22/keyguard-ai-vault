
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { 
  Trash2, 
  Edit, 
  Plus, 
  Search,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const { 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    selectedCategory,
    setSelectedCategory,
    setIsAuthenticated,
    setSearchQuery
  } = useApp();
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateCategory = () => {
    if (editingCategory && newCategoryName.trim()) {
      updateCategory(editingCategory, newCategoryName.trim());
      setNewCategoryName('');
      setEditingCategory(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-48 h-screen bg-sidebar flex flex-col border-r border-white/10">
      <div className="p-2 border-b border-white/10">
        <h1 className="text-sm font-bold text-gradient-primary mb-2">whereMYAPIKEY?</h1>
        <div className="relative mb-1">
          <Search className="w-3 h-3 absolute left-2 top-1/2 transform -translate-y-1/2 text-white/50" />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-7 py-1 h-7 bg-white/5 border-white/10 text-xs"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between p-2 border-b border-white/10">
        <h2 className="text-xs font-semibold text-white/70">CATEGORIES</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => {
            setNewCategoryName('');
            setIsAddDialogOpen(true);
          }} 
          className="h-5 w-5 rounded-full hover:bg-white/10"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="space-y-0.5 p-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`w-full flex items-center px-2 py-1 text-xs rounded-md transition-colors ${
              selectedCategory === null 
                ? 'bg-brand-purple/30 text-white font-medium'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            All API Keys
          </button>
          
          {categories.map((category) => (
            <div key={category.id} className="group flex items-center">
              <button
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-1 flex items-center px-2 py-1 text-xs rounded-md transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-brand-purple/30 text-white font-medium'
                    : 'text-white/70 hover:bg-white/10'
                }`}
              >
                {category.name}
              </button>
              
              <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCategory(category.id);
                    setNewCategoryName(category.name);
                    setIsEditDialogOpen(true);
                  }} 
                  className="h-5 w-5 rounded-full hover:bg-white/10"
                >
                  <Edit className="h-2.5 w-2.5" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCategory(category.id);
                  }} 
                  className="h-5 w-5 rounded-full hover:bg-white/10"
                >
                  <Trash2 className="h-2.5 w-2.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-2 border-t border-white/10">
        <Button 
          variant="ghost" 
          onClick={() => setIsAuthenticated(false)} 
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10 text-xs py-1 h-7"
        >
          <LogOut className="mr-1 h-3 w-3" />
          <span>Logout</span>
        </Button>
      </div>
      
      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="col-span-3"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAddCategory}>
              Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Category name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="col-span-3"
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateCategory}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
