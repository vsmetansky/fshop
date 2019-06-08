export default abstract class Storage {
    static async insert(x: any) {
        const Model = this.model;
        return new Model(x).save();
    }
    static async update(x: any) {
        return this.model.findByIdAndUpdate(x._id, x);
    }
    static async delete(id: string) {
        return this.model.findByIdAndDelete(id);
    }
    //template method
    static async getAll() {
        return this.populator(await this.model.find());
    }
    //template method
    static async getById(id: string) {
        return this.populator(await this.model.findById(id));
    }
    //primitive method
    protected static async populator(items: any) {
        return items;
    }
    protected static get model(): any { 
        return undefined;
    }
};